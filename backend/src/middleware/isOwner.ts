import * as error from "../errors/AppError.js"
import { Middleware } from "../types/index.types.js";
import { PostModel } from "../models/Post.model.js";
import { CommentModel } from "../models/Comment.model.js";

export const isPostOwner: Middleware = async (req, res, next) => {

  // get the post object so we can get the user who posted
  const postId = req.params.id
  const post = await PostModel.findById(postId) // 1. using findby id to auto convert string to ObjectID. Making filtering for deletedAt more pure

  if (!post || post.deletedAt !== null) throw new error.NotFoundError() // 2. verify post exists (not deleted)

  const postOwner = post.userId!.toString()
  const userId = req.user.id.toString()

  if (postOwner !== userId) throw new error.ForbiddenError("You can only edit your own posts")

  next()
}

export const isCommentOwner: Middleware = async (req, res, next) => {
  
  // get the comment object so we can get the user who posted
  const commentId = req.params.commentId
  const comment = await CommentModel.findById(commentId)
  const commentOwner = comment?.userId.toString()

  const userId = req.user.id.toString()

  if (!comment || comment.deletedAt !== null) throw new error.NotFoundError()
  if (userId !== commentOwner) throw new error.ForbiddenError("You can only edit your own comments")
  
  next()
}