import express from "express"
import { getAllPosts, getPostById, createPost, updatePost, deletePost } from "../controllers/posts.controller.js"

const postsRouter = express.Router()

postsRouter.get("/", getAllPosts)
postsRouter.get("/:id", getPostById)
postsRouter.post("/", createPost)
postsRouter.patch("/:id", updatePost)
postsRouter.delete("/:id", deletePost)

export default postsRouter