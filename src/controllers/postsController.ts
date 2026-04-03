import express from "express"
import { getPosts } from "../routes/posts.js"

const postsRouter = express.Router()

postsRouter.get("/", getPosts)
//Här kommer post, patch och delete också

export default postsRouter