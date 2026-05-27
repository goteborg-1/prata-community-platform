import * as error from "../errors/AppError.js"
import { Controller } from "../types/index.types.js";
import { CommentModel } from "../models/Comment.model.js";
import { PostModel } from "../models/Post.model.js";
import { CreateCommentRequest, UpdateCommentRequest, CommentParams, updateCommentSchema, createCommentSchema } from "@prata/shared";

export const getAllComments: Controller<CommentParams> = async (req, res) => {
  const postId = req.params.postId;

  const post = await PostModel.findById(postId)
  const postAuthorId = post?.userId?.toString()

  const comments = await CommentModel.find({ postId, deletedAt: null }).populate("userId", "displayName avatarColor")

  const currentUserId = req.user?.id?.toString()

  res.status(200).json({
    status: "success",
    data: comments.map(comment => {
      const rawUserId = (comment.userId as any)?._id?.toString() ?? comment.userId?.toString()
      const isOwner = (comment.userId as any)?._id?.toString() === currentUserId
      const isOriginalPoster = postAuthorId === rawUserId

      return {
        ...comment.toJSON(),
        isLikedByCurrentUser: currentUserId
          ? (comment.likedBy ?? []).includes(currentUserId)
          : false,
        isOwnedByCurrentUser: currentUserId
          ? rawUserId === currentUserId
          : false,
        isOP: !!isOriginalPoster,
        isOwner
      }
    })
  })
}

export const createComment: Controller<CommentParams, CreateCommentRequest, {}> = async (req, res) => {
  const validatedData = createCommentSchema.parse(req.body)
  
  const postId = req.params.postId;
  const userId = req.user.id
  
  if(!userId) throw new error.UnAuthorizedError()

  const post = await PostModel.findOne({ _id: postId, deletedAt: null })
  if (!post) throw new error.NotFoundError()
  
  const newComment = await CommentModel.create({
    ...validatedData,
    postId,
    userId,
    isEdited: false,
    likedBy: [userId],
    isPsychologist: req.user.role === 'psychologist'
  })

  await newComment.populate("userId", "displayName avatarColor")

  const isOwner = (newComment.userId as any)?._id?.toString() === userId
  const isOriginalPoster = post.userId === newComment.userId.toString()

  //Add comment to counter in posts
  await PostModel.findByIdAndUpdate(postId, { $inc: { commentCount: 1 } })

  res.status(201).json({
    status: "success",
    data: {
      ...newComment.toJSON(),
      isOP: isOriginalPoster,
      isOwner
    }
  })
}

export const updateComment: Controller<CommentParams, UpdateCommentRequest, {}> = async (req, res) => {
  const validatedData = updateCommentSchema.parse(req.body)
  
  const commentId = req.params.commentId

  const updatedComment = await CommentModel.findOneAndUpdate(
    { _id: commentId, deletedAt: null },
    { $set: { content: validatedData.content, isEdited: true } },
    { new: true }
  )

  if (!updatedComment) throw new error.NotFoundError()

  res.status(200).json({
    status: "success",
    data: updatedComment
  })
}

export const deleteComment: Controller<CommentParams> = async (req, res) => {
  const commentId = req.params.commentId

  const comment = await CommentModel.findOne({ _id: commentId, deletedAt: null })
  if (!comment) throw new error.NotFoundError()

  const deletedComment = await CommentModel.findOneAndUpdate({ _id: commentId, deletedAt: null }, {deletedAt: new Date()}, {new: true})
  if (!deletedComment) throw new error.NotFoundError()

  //Remove one comment count on posts
  await PostModel.findByIdAndUpdate(comment.postId, { $inc: { commentCount: -1 } })

  res.status(204).send()
}


// ----------- LIKES -----------

export const toggleCommentLike: Controller<CommentParams, {}> = async (req, res) => {
  const commentId = req.params.commentId
  const userId = req.user.id.toString()

  const comment = await CommentModel.findOne({ _id: commentId, deletedAt: null }).select("likedBy")
  if (!comment) throw new error.NotFoundError()

  const alreadyLiked = (comment.likedBy || []).includes(userId)

  const updateComment = await CommentModel.findOneAndUpdate(
    { _id: commentId, deletedAt: null },
    alreadyLiked ? { $pull: {likedBy: userId} } : { $addToSet: {likedBy: userId} }
  )

  res.status(200).json({
    status: "success",
    data: { isLiked: !alreadyLiked }
  })
}