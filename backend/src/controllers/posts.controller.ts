import * as error from "../errors/AppError.js"
import { Controller } from "../types/index.types.js"
import { PostModel } from "../models/Post.model.js"
import { CreatePostRequest, createPostSchema, getPostsQuerySchema, PostParams, postParamsSchema, UpdatePostRequest, updatePostSchema, type GetPostsQuery } from "@prata/shared"
import { CommentModel } from "../models/Comment.model.js"

export const getAllPosts: Controller = async (req, res) => {
  const { categories, triggerTags, search, sort, page, limit } = getPostsQuerySchema.parse(req.query)

  const query: Record<string, unknown> = {}

  //Filtering
  if(categories && categories.length > 0) {
    query.categories = {$in: categories} //Match at least one category
  }

  if(triggerTags && triggerTags.length > 0) {
    query.triggerTags = {$nin: triggerTags}
  }

  //Search
  if(search) {
    //Search for both title and description
    query.$or = [
      {title: {$regex: search, $options: "i"}},
      {description: {$regex: search, $options: "i"}}
    ]
  }

  //Sort
  let sortOptions: Record<string, 1 | -1> = {createdAt: -1} //Default, newest first
  if(sort === "popular") {
    sortOptions = {likeCount: -1}
  }

  const skip = (page - 1) * limit

  const [posts, total] = await Promise.all([
    PostModel.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(limit)
      .populate("userId", "displayName avatarColor"),
    PostModel.countDocuments(query)
  ])

  const currentUserId = req.user?.id?.toString()

  res.json({
    status: "success",
    data: posts.map(post => ({
      ...post.toJSON(),
      isLiked: currentUserId
        ? (post.likedBy ?? []).some(id => id.toString() === currentUserId)
        : false
    })),
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit)
    }
  })
}

export const getPostById: Controller<PostParams> = async (req, res) => {
  const { id } = postParamsSchema.parse(req.params)
  const post = await PostModel.findById(id).populate("userId", "displayName avatarColor")

  if(!post) throw new error.NotFoundError()

  const currentUserId = req.user?.id?.toString()
  const isOwner = (post.userId as any)?._id?.toString() === currentUserId

  res.status(200).json({
    status: "success",
    data: {
      ...post.toJSON(),
      isLiked: currentUserId
        ? (post.likedBy ?? []).some(id => id.toString() === currentUserId)
        : false,
      isOwner
    }
  })
}

export const createPost: Controller<{}, CreatePostRequest> = async (req, res) => {
  const validatedData = createPostSchema.parse(req.body)  
  const userId = req.user.id
  
  if(!userId) throw new error.UnAuthorizedError()

  const newPost = await PostModel.create({
    userId,
    ...validatedData,
    likedBy: [userId] //Make the writer like post by default
  })

  res.status(201).json({
    status: "success",
    data: newPost
  })
}

export const updatePost: Controller<PostParams, UpdatePostRequest> = async (req, res) => {
  const { id } = postParamsSchema.parse(req.params)
  const validatedData = updatePostSchema.parse(req.body)

  const updatedPost = await PostModel.findByIdAndUpdate(
    id,
    {$set: validatedData},
    {
      new: true,
      runValidators: true
    }
  )

  if(!updatedPost) throw new error.NotFoundError()

  res.json({
    status: "success",
    data: updatedPost
  })
}

export const toggleLike: Controller<PostParams> = async (req, res) => {
  const { id } = postParamsSchema.parse(req.params)

  const userId = req.user.id
  if(!userId) throw new error.UnAuthorizedError()

  const post = await PostModel.findById(id)
  if(!post) throw new error.NotFoundError()

  const hasLiked = (post.likedBy || []).some(id => id.toString() === userId.toString())
  const isOwner = post.userId?.toString() === userId.toString()

  if(isOwner && hasLiked) throw new error.ForbiddenError("You cannot unlike your own post")

  const updatedPost = await PostModel.findByIdAndUpdate(
    id,
    hasLiked
      ? {$pull: {likedBy: userId}} //Remove like if already liked
      : {$addToSet: {likedBy: userId}}, //Add if not already liked
    {new: true}
  )

  if(!updatedPost) throw new error.NotFoundError()

  res.json({
    status: "success",
    data: {
      ...updatedPost.toJSON(), 
      isLiked: !hasLiked, 
      isOwner
    },
    message: hasLiked ? "Like removed" : "Like added"
  })
}

export const deletePost: Controller<PostParams> = async (req, res) => {
  const { id } = postParamsSchema.parse(req.params)

  await CommentModel.deleteMany({postId: id})
  const deletedPost = await PostModel.findByIdAndDelete(id)

  if(!deletedPost) throw new error.NotFoundError()

  res.status(204).send()
}