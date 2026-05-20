import express from "express"
import { checkAuth } from "../middleware/checkAuth.js"
import { isPostOwner } from "../middleware/isOwner.js"
import { getAllPosts, getPostById, createPost, updatePost, toggleLike, deletePost } from "../controllers/posts.controller.js"
import { optionalAuth } from "../middleware/optionalAuth.js"

const postsRouter = express.Router()

postsRouter.get("/", optionalAuth, getAllPosts)
postsRouter.get("/:id", optionalAuth, getPostById)
postsRouter.post("/", checkAuth, createPost)
postsRouter.patch("/:id", checkAuth, isPostOwner, updatePost)
postsRouter.patch("/:id/like", checkAuth, toggleLike)
postsRouter.delete("/:id", checkAuth, isPostOwner, deletePost)

export default postsRouter