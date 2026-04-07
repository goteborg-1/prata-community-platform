import { Controller, HttpError } from "../types/express.js"
import { MOCK_POSTS } from "../mockdata/mockPosts.js"

export const getPosts: Controller = (req, res) => {
  //Filtrering
}

export const getPostById: Controller = (req, res) => {
  const id = parseInt(req.params.id)
  const post = MOCK_POSTS.find(p => p.id === id)

  if(!post) {
    const err = new Error(`No posts with id ${id} found`) as HttpError
    err.status = 404
    err.code = "POST_NOT_FOUND"
    throw err
  }

  res.status(200).json({
    "status": "success",
    "data": post
  })
}

export const createPost: Controller = (req, res) => {

}

export const updatePost: Controller = (req, res) => {

}

export const deletePost: Controller = (req, res) => {

}