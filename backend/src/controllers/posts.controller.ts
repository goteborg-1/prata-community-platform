import { Controller } from "../types/index.types.js"
import { createError } from "../utils/createError.js"
import { PostModel } from "../models/Post.model.js"
import { CreatePostRequest, createPostSchema, getPostsQuerySchema, PostParams, postParamsSchema, type GetPostsQuery } from "@shared"
import { CommentModel } from "../models/Comment.model.js"

export const getAllPosts: Controller<{}, {}, GetPostsQuery> = async (req, res) => {
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
      .limit(limit),
    PostModel.countDocuments(query)
  ])

  res.json({
    status: "success",
    data: posts,
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
  const post = await PostModel.findById(id)

  if(!post) {
    throw createError(`No posts with id ${id} found`, 404, "POST_NOT_FOUND")
  }

  res.status(200).json({
    status: "success",
    data: post
  })
}

export const createPost: Controller<{}, CreatePostRequest> = async (req, res) => {
  const validatedData = createPostSchema.parse(req.body)  
  const userId = req.user.id
  
  if(!userId) {
    throw createError("Not authenticated", 401, "NOT_AUTHENTICATED")
  }

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

export const updatePost: Controller<PostParams, UpdatePostBody> = async (req, res) => {
  const id = req.params.id
  const updateData = req.body

  const updatedPost = await PostModel.findByIdAndUpdate(
    id,
    {$set: updateData},
    {
      new: true,
      runValidators: true
    }
  )

  if(!updatedPost) {
    throw createError("Could not find post to update", 404, "POST_NOT_FOUND")
  }

  res.json({
    status: "success",
    data: updatedPost
  })
}

export const toggleLike: Controller<PostParams> = async (req, res) => {
  const id = req.params.id
  const userId = req.user.id

  if(!userId) {
    throw createError("Not authenticated", 401, "NOT_AUTHENTICATED")
  }

  const post = await PostModel.findById(id).select("likedBy")

  if(!post) {
    throw createError("Could not find post", 404, "POST_NOT_FOUND")
  }

  const hasLiked = (post.likedBy || []).includes(userId)

  const updatedPost = await PostModel.findByIdAndUpdate(
    id,
    hasLiked
      ? {$pull: {likedBy: userId}} //Remove like if already liked
      : {$addToSet: {likedBy: userId}}, //Add if not already liked
    {new: true}
  )

  res.json({
    status: "success",
    data: updatedPost,
    message: hasLiked ? "Like removed" : "Like added"
  })
}

export const deletePost: Controller<PostParams> = async (req, res) => {
  const id = req.params.id

  await CommentModel.deleteMany({id})
  const deletedPost = await PostModel.findByIdAndDelete(id)

  if(!deletedPost) {
    throw createError("Could not find post to delete", 404, "POST_NOT_FOUND")
  }

  res.status(204).send()
}