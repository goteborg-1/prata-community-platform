import { Controller, HttpError } from "../types/index.types.js"
import { MOCK_POSTS } from "../mockdata/mockPosts.js"
import type { CreatePostBody, Post, PostParams } from "../types/posts.types.js"

export const getAllPosts: Controller = (req, res) => {
  //Filtrering
}

export const getPostById: Controller<PostParams> = (req, res) => {
  const id = parseInt(req.params.id)

  if(isNaN(id)) {
    const err = new Error("Invalid ID format") as HttpError
    err.status = 400
    err.code = "INVALID_ID"
    throw err
  }

  const post = MOCK_POSTS.find(p => p.id === id)

  if(!post) {
    const err = new Error(`No posts with id ${id} found`) as HttpError
    err.status = 404
    err.code = "POST_NOT_FOUND"
    throw err
  }

  res.status(200).json({
    status: "success",
    data: post
  })
}

export const createPost: Controller<{}, CreatePostBody> = (req, res) => {
  const {isAnonymous, title, description, categories, triggerTags} = req.body

  if(!title || !description || !categories) {
    const err = new Error("Missing title, description or categories") as HttpError
    err.status = 400
    err.code = "MISSING_REQUIRED_FIELDS"
    throw err
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