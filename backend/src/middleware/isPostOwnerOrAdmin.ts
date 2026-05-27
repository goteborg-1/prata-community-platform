import * as error from "../errors/AppError.js"
import { Middleware } from "../types/index.types.js";
import { PostModel } from "../models/Post.model.js";
import { CommentModel } from "../models/Comment.model.js";

export const isPostOwnerOrAdmin: Middleware = async (req, res, next) => {
  const user = req.user
  if(!user) throw new error.UnAuthorizedError()
  
  const postId = req.params.id
  const post = await PostModel.findById(postId)

  if(!post || post.deletedAt !== null) throw new error.NotFoundError()

  const postOwner = post.userId?.toString()
  const userId = user.id.toString()

  if(postOwner !== userId && user.role !== "admin") {
    throw new error.ForbiddenError()
  }

  next()
}

export const isCommentOwnerOrAdmin: Middleware = async (req, res, next) => {
  const user = req.user
  if(!user) throw new error.UnAuthorizedError()
  
  const commentId = req.params.commentId
  const comment = await CommentModel.findById(commentId)
  
  if(!comment || comment.deletedAt !== null) throw new error.NotFoundError()
    
  const commentOwner = comment?.userId.toString()
  const userId = user.id.toString()

  if(commentOwner !== userId && user.role !== "admin") {
    throw new error.ForbiddenError()
  }

  next()
}