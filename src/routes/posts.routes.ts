import express from "express"
import { checkAuth } from "../middleware/checkAuth.js"
import { isPostOwner } from "../middleware/isOwner.js"
import { getAllPosts, getPostById, createPost, updatePost, deletePost } from "../controllers/posts.controller.js"

const postsRouter = express.Router()

postsRouter.get("/", getAllPosts)
postsRouter.get("/:id", getPostById)
postsRouter.post("/", checkAuth, createPost)
postsRouter.patch("/:id", checkAuth, isPostOwner, updatePost)
postsRouter.delete("/:id", checkAuth, isPostOwner, deletePost)

export default postsRouter