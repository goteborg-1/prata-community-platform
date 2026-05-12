import { Controller } from "../types/index.types.js";
import { createError } from "../utils/createError.js";
import { CommentModel } from "../models/Comment.model.js";
import { PostModel } from "../models/Post.model.js";

import { CreateCommentRequest, UpdateCommentRequest, CommentParams, commentParamsSchema, commentSchema, updateCommentSchema, createCommentSchema } from "@shared";

export const getAllComments: Controller<CommentParams> = async (req, res) => {
  const postId = req.params.postId;

  if (!postId) {
    throw createError("Invalid ID format", 400, "INVALID_ID")
  }

  const comments = await CommentModel.find({ postId }).populate("userId", "displayName")

  if (comments.length === 0) {
    throw createError(`No comments attached to post id ${postId} found`, 404, "COMMENTS_NOT_FOUND")
  }

  res.status(200).json({
    status: "success",
    data: comments
  })
}

export const createComment: Controller<CommentParams, CreateCommentRequest, {}> = async (req, res) => {
  const validatedData = createCommentSchema.parse(req.body)

  const postId = req.params.postId;
  const userId = req.user.id

  if(!userId) {
    throw createError("Not authenticated", 401, "NOT_AUTHENTICATED")
  }
  
  const newComment = await CommentModel.create({
    ...validatedData,
    postId,
    userId,
    isEdited: false,
    likedBy: [userId]
  })

  //Add comment to counter in posts
  await PostModel.findByIdAndUpdate(postId, { $inc: { commentCount: 1 } });

  res.status(201).json({
    status: "success",
    data: {
      ...newComment.toJSON(),
      username: validatedData.isAnonymous ? null : req.user.displayName
    }
  })
}

export const updateComment: Controller<CommentParams, UpdateCommentRequest, {}> = async (req, res) => {
  const validatedData = updateCommentSchema.parse(req.body)
  
  const commentId = req.params.commentId

  const updatedComment = await CommentModel.findByIdAndUpdate(
    commentId,
    { $set: { content: validatedData.content, isEdited: true } },
    { new: true }
  )

  if (!updatedComment) {
    throw createError(`Comment with id ${commentId} not found`, 404, "COMMENT_NOT_FOUND")
  }

  res.status(200).json({
    status: "success",
    data: updatedComment
  })
}

export const deleteComment: Controller<CommentParams> = async (req, res) => {
  const commentId = req.params.commentId

  const comment = await CommentModel.findById(commentId)

  if (!comment) {
    throw createError(`Comment with id ${commentId} not found`, 404, "COMMENT_NOT_FOUND")
  }

  const deletedComment = await CommentModel.findByIdAndDelete(commentId)

  if (!deletedComment) {
    throw createError(`Comment with id ${commentId} not found`, 404, "COMMENT_NOT_FOUND")
  }

  //Remove one comment count on posts
  await PostModel.findByIdAndUpdate(comment.postId, { $inc: { commentCount: -1 } })

  res.status(204).send()
}


// ----------- LIKES -----------

export const toggleCommentLike: Controller<CommentParams, {}> = async (req, res) => {
  const commentId = req.params.commentId
  const userId = req.user.id.toString()

  const comment = await CommentModel.findById(commentId).select("likedBy")
  if (!comment) throw createError(`Comment with id ${commentId} not found`, 404, "COMMENT_NOT_FOUND");

  const alreadyLiked = (comment.likedBy || []).includes(userId)

  const updateComment = await CommentModel.findByIdAndUpdate(
    commentId,
    alreadyLiked ? { $pull: {likedBy: userId} } : { $addToSet: {likedBy: userId} }
  )

  res.status(200).json({updateComment})
}