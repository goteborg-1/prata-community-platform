import express from "express"
import { getPosts } from "../controllers/postsController.js"

const postsRouter = express.Router()

postsRouter.get("/", getPosts)
//Här kommer post, patch och delete också

export default postsRouter