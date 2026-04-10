import { Controller } from "../types/index.types.js";
import { MOCK_COMMENTS } from "../mockdata/mockComments.js";
import { createError } from "../utils/createError.js";

import type { Comment, CommentParams, CreateCommentBody } from "../types/comments.types.js";

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

  if (!comments) {
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

export const updateComment: Controller = (req, res) => {

}

export const deleteComment: Controller = (req, res) => {

}
