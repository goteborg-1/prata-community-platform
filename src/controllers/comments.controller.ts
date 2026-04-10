import { Controller } from "../types/index.types.js";
import { MOCK_COMMENTS } from "../mockdata/mockComments.js";
import { createError } from "../utils/createError.js";

import type { Comment, CommentParams, CreateCommentBody, UpdateCommentBody } from "../types/comments.types.js";

// ---- FOCUS ----
// GET comments
// POST comments
// DELETE comments
// ---- FOCUS ----

export const getAllComments: Controller<CommentParams> = (req, res) => {
  const postId = parseInt(req.params.postId);

  if (isNaN(postId)) {
    throw createError("Invalid ID format", 400, "INVALID_ID")
  }

  // ** REPLACE WITH DATABASE LATER **
  const comments = MOCK_COMMENTS.filter(comment => comment.postId === postId) // find comments for that post

  if (comments.length === 0) {
    throw createError(`No comments attached to post id ${postId} found`, 404, "COMMENTS_NOT_FOUND")
  }

  res.status(200).json({
    status: "success",
    data: comments
  })
}


export const createComment: Controller<CommentParams, CreateCommentBody, {}> = (req, res) => {
  const {userId, isAnonymous, isPsychologist, content} = req.body;

  const postId = req.params.postId;


  // error at missing user input
  if(!content) {
    throw createError("Missing comment", 400, "MISSING_REQUIRED_FIELDS")
  }
  
  const newComment: Comment = {
    id: MOCK_COMMENTS.length + 1,
    postId: parseInt(postId),
    userId,
    isAnonymous,
    isPsychologist,
    createdAt: new Date().toISOString(),
    isEdited: false, // perhaps have an if statement here to check if its an edit -> or perhaps thats in patch?
    likes: 1,
    dislikes: 0,
    content
  }

  MOCK_COMMENTS.push(newComment);

  res.status(201).json({
    status: "success",
    data: newComment
  })
}

// TODO: comments/:id/like endpoint in future to update likes seperatley "likes är en egen handling"
export const updateComment: Controller<CommentParams, UpdateCommentBody, {}> = (req, res) => {
  
  const postId = parseInt(req.params.postId)
  const commentId = parseInt(req.params.commentId)
  const newContent = req.body.content

  if (isNaN(postId) || isNaN(commentId)) {
    throw createError("Invalid ID format", 400, "INVALID_ID")
  }

  if (!newContent) {
    throw createError("Missing content", 400, "MISSING_REQUIRED_FIELDS")
  }

  // specific comment that shall be edited. must also belong to the correct post
  const selectedComment = MOCK_COMMENTS.find(
    comment => comment.id === commentId && comment.postId === postId
  )

  // early error throw
  if (!selectedComment) {
    throw createError(`comment with id ${commentId} not found on post id ${postId}`, 404, "COMMENT_NOT_FOUND")
  }

  // replaces previous comment & sets edited = true (perhaps save old comment in the future?)
  selectedComment.content = newContent;
  selectedComment.isEdited = true;


  res.status(200).json({
    status: "success",
    data: selectedComment
  })

}

export const deleteComment: Controller<CommentParams> = (req, res) => {

  const postId = parseInt(req.params.postId)
  const commentId = parseInt(req.params.commentId);

  if (isNaN(postId) || isNaN(commentId)) {
    throw createError("Invalid ID format", 400, "INVALID_ID")
  }

  // finding index so that I can use splice method (remove from array) => will probbaly remake when using database anyways
  const index = MOCK_COMMENTS.findIndex(
    comment => comment.id === commentId && comment.postId === postId
  )

  // -1 because fidIndex returns -1 if not found
  if (index === -1) {
    throw createError(`comment with id ${commentId} not found on post id ${postId}`, 404, "COMMENT_NOT_FOUND")
  }

  // DELETE at index
  MOCK_COMMENTS.splice(index, 1)

  res.status(204).send()
}
