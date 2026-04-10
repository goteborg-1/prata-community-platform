import { Controller, HttpError } from "../types/index.types.js"
import { MOCK_POSTS } from "../mockdata/mockPosts.js"
import type { CreatePostBody, getPostQuery, Post, PostParams, UpdatePostBody } from "../types/posts.types.js"

export const getAllPosts: Controller<{}, {}, getPostQuery> = (req, res) => {
  const { categories, search, sort, page, limit } = req.query

  let result = [...MOCK_POSTS]

  //Filtering
  if(categories) {
    const categoryArray = Array.isArray(categories) ? categories : [categories]

    result = result.filter(p => p.categories.some(
      c => categoryArray.includes(c)
    ))
  }

  if(search) {
    const searchTerm = search.toLowerCase()
    result = result.filter(p =>
      p.title.toLowerCase().includes(searchTerm) ||
      p.description.toLowerCase().includes(searchTerm)
    )
  }

  //Sort
  if(sort === "popular") {
    result.sort((a, b) => b.likes - a.likes)
  } else {
    result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  }

  //Pagination
  const total = result.length
  const pageNum = Number(page) || 1
  const limitNum = Number(limit) || 5
  const totalPages = Math.ceil(total / limitNum)
  const startIndex = (pageNum - 1) * limitNum
  const endIndex = startIndex + limitNum

  const pageData = result.slice(startIndex, endIndex)

  res.json({
    status: "success",
    data: pageData,
    meta: {
      page: pageNum,
      limit: limitNum,
      total,
      totalPages
    }
  })
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
    description,
    categories,
    triggerTags: triggerTags || [],
    likes: 0
  }

  MOCK_POSTS.push(newPost)

  res.status(201).json({
    status: "success",
    data: newPost
  })
}

export const updatePost: Controller<PostParams, UpdatePostBody> = (req, res) => {
  const {title, description, categories, triggerTags} = req.body
  const id = parseInt(req.params.id)

  if(isNaN(id)) {
    throw createError("Invalid ID format", 400, "INVALID_ID")
  }

  const postIndex = MOCK_POSTS.findIndex(p => p.id === id)

  if(postIndex < 0) {
    throw createError(`No posts with id ${id} found`, 404, "POST_NOT_FOUND")
  }

  const updatedPost: Post = {
    ...MOCK_POSTS[postIndex],
    ...req.body,
    id
  } as Post

  MOCK_POSTS[postIndex] = updatedPost

  res.json({
    status: "success",
    data: updatedPost
  })
}

export const deletePost: Controller<PostParams> = (req, res) => {
  const id = parseInt(req.params.id)

  if(isNaN(id)) {
    throw createError("Invalid ID format", 400, "INVALID_ID")
  }

  const postIndex = MOCK_POSTS.findIndex(p => p.id === id)

  if(postIndex < 0) {
    throw createError(`No posts with id ${id} found`, 404, "POST_NOT_FOUND")
  }

  MOCK_POSTS.splice(postIndex, 1)

  res.status(204).send()
}