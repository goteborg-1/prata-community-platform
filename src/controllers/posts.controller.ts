import { Controller } from "../types/index.types.js"
import { createError } from "../utils/createError.js"
import { MOCK_POSTS } from "../mockdata/mockPosts.js"
import type { CreatePostBody, Post, PostParams } from "../types/posts.types.js"

export const getAllPosts: Controller = (req, res) => {
  //Filtrering
}

export const getPostById: Controller<PostParams> = (req, res) => {
  const id = parseInt(req.params.id)

  if(isNaN(id)) {
    throw createError("Invalid ID format", 400, "INVALID_ID")
  }

  const post = MOCK_POSTS.find(p => p.id === id)

  if(!post) {
    throw createError(`No posts with id ${id} found`, 404, "POST_NOT_FOUND")
  }

  res.status(200).json({
    status: "success",
    data: post
  })
}

export const createPost: Controller<{}, CreatePostBody> = (req, res) => {
  const {isAnonymous, title, description, categories, triggerTags} = req.body

  if(!title || !description || !categories) {
    throw createError("Missing title, description or categories", 400, "MISSING_REQUIRED_FIELDS")
  }

  const newPost: Post = {
    id: MOCK_POSTS.length + 1,
    userId: "u53", //Will be getting from database
    isAnonymous: isAnonymous ?? false,
    createdAt: new Date().toISOString(),
    title: title,
    description: description,
    categories: categories,
    triggerTags: triggerTags || [],
    likes: 0
  }

  MOCK_POSTS.push(newPost)

  res.status(201).json({
    status: "success",
    data: newPost
  })
}

export const updatePost: Controller = (req, res) => {

}

export const deletePost: Controller = (req, res) => {

}