import { Middleware } from "../types/index.types.js";
import { createError } from "../utils/createError.js";
import { PostModel } from "../models/Post.model.js";
import { CommentModel } from "../models/Comment.model.js";

export const isPostOwner: Middleware = async (req, res, next) => {

  // get the post object so we can get the user who posted
  const postId = req.params.id
  const post = await PostModel.findById(postId)
  const postOwner = post?.userId

  const userId = req.user.id

  if (!post) {
    throw createError(`post with id ${postId} does not exist`, 404, "POST_NOT_FOUND")
  }
  if (postOwner !== userId) {
    throw createError("Invalid user, post ID and user ID did not match", 403, "INVALID_USER")
  }


  next()
}

export const isCommentOwner: Middleware = async (req, res, next) => {
  
  // get the comment object so we can get the user who posted
  const commentId = req.params.commentId
  const comment = await CommentModel.findById(commentId)
  const commentOwner = comment?.userId

  const userId = req.user.id


  if (!comment) {
    throw createError(`comment with id ${commentId} does not exist`, 404, "COMMENT_NOT_FOUND")
  }
  if (userId !== commentOwner) {
    throw createError("Invalid user, comment owner ID and user ID did not match", 403, "INVALID_USER")
  }
  
  next()
}