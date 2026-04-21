import { Controller } from "../types/index.types.js"
import { createError } from "../utils/createError.js"
import type { CreatePostBody, getPostQuery, Post, PostParams, UpdatePostBody } from "../types/posts.types.js"
import { PostModel } from "../models/Post.model.js"

export const getAllPosts: Controller<{}, {}, getPostQuery> = async (req, res) => {
  const { categories, search, sort, page, limit } = req.query

  const query: any = {}

  //Filtering
  if(categories) {
    const categoryArray = Array.isArray(categories) ? categories : [categories]

    query.categories = {$in: categoryArray} //Match at least one category
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
  let sortOptions: any = {createdAt: -1} //Default, newest first
  if(sort === "popular") {
    sortOptions = {likedBy: -1}
  }

  const pageNum = Number(page) || 1
  const limitNum = Number(limit) || 5
  const skip = (pageNum - 1) * limitNum

  const [posts, total] = await Promise.all([
    PostModel.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(limitNum),
    PostModel.countDocuments(query)
  ])

  const totalPages = Math.ceil(total / limitNum)

  res.json({
    status: "success",
    data: posts,
    meta: {
      page: pageNum,
      limit: limitNum,
      total,
      totalPages
    }
  })
}

export const getPostById: Controller<PostParams> = async (req, res) => {
  const id = req.params.id
  const post = await PostModel.findById(id)

  if(!post) {
    throw createError(`No posts with id ${id} found`, 404, "POST_NOT_FOUND")
  }

  res.status(200).json({
    status: "success",
    data: post
  })
}

export const createPost: Controller<{}, CreatePostBody> = async (req, res) => {
  const {title, description, categories, triggerTags} = req.body

  if(!title || !description || !categories) {
    throw createError("Missing title, description or categories", 400, "MISSING_REQUIRED_FIELDS")
  }

  const currentUserId = "u53"

  const newPost = await PostModel.create({
    userId: currentUserId,
    title,
    description,
    categories,
    triggerTags: triggerTags || [],
    likedBy: [currentUserId] //Make the writer like post by default
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
    updateData,
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
  const userId = "u459" //Will be getting from database

  const post = await PostModel.findById(id)

  if(!post) {
    throw createError("Could not find post", 404, "POST_NOT_FOUND")
  }

  const hasLiked = post.likedBy.includes(userId)

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

  const deletedPost = await PostModel.findByIdAndDelete(id)

  if(!deletedPost) {
    throw createError("Could not find post to delete", 404, "POST_NOT_FOUND")
  }

  res.status(204).send()
}