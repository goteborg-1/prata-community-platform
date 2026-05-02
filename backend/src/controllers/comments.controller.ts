import { Controller } from "../types/index.types.js";
import { createError } from "../utils/createError.js";
import { CommentModel } from "../models/Comment.model.js";

import type { CommentParams, CreateCommentBody, UpdateCommentBody } from "@shared";

export const getAllComments: Controller<CommentParams> = async (req, res) => {
  const postId = req.params.postId;

  if (!postId) {
    throw createError("Invalid ID format", 400, "INVALID_ID")
  }

  const comments = await CommentModel.find({ postId })

  if (comments.length === 0) {
    throw createError(`No comments attached to post id ${postId} found`, 404, "COMMENTS_NOT_FOUND")
  }

  res.status(200).json({
    status: "success",
    data: comments
  })
}

export const createComment: Controller<CommentParams, CreateCommentBody, {}> = async (req, res) => {
  const { isAnonymous, isPsychologist, content } = req.body;
  const postId = req.params.postId;
  
  if (!content) {
    throw createError("Missing comment", 400, "MISSING_REQUIRED_FIELDS")
  }

  const userId = req.user.id

  if(!userId) {
    throw createError("Not authenticated", 401, "NOT_AUTHENTICATED")
  }
  
  const newComment = await CommentModel.create({
    postId,
    userId,
    isAnonymous,
    isPsychologist,
    isEdited: false,
    likedBy: [userId],
    content
  })

  res.status(201).json({
    status: "success",
    data: newComment
  })
}

// TODO: comments/:id/like endpoint in future to update likes separately
export const updateComment: Controller<CommentParams, UpdateCommentBody, {}> = async (req, res) => {
  const commentId = req.params.commentId
  const newContent = req.body.content

  if (!newContent) {
    throw createError("Missing content", 400, "MISSING_REQUIRED_FIELDS")
  }

  const updatedComment = await CommentModel.findByIdAndUpdate(
    commentId,
    { $set: { content: newContent, isEdited: true } },
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

  const deletedComment = await CommentModel.findByIdAndDelete(commentId)

  if (!deletedComment) {
    throw createError(`Comment with id ${commentId} not found`, 404, "COMMENT_NOT_FOUND")
  }

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