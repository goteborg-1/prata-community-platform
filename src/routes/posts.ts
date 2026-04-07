import express from "express"
import { getPosts, getPostById, createPost, updatePost, deletePost } from "../controllers/postsController.js"

const postsRouter = express.Router()

postsRouter.get("/", getPosts)
postsRouter.get("/:id", getPostById)
postsRouter.post("/", createPost)
postsRouter.patch("/:id", updatePost)
postsRouter.delete("/:id", deletePost)

export default postsRouter