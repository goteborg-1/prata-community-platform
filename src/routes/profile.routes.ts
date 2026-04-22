import express from "express"
import { getProfile, updateProfile, deleteProfile, getMyPosts, getMyLikedPosts } from "../controllers/profile.routes.js"

const profileRouter = express.Router()

//Account management
profileRouter.get("/", getProfile)
profileRouter.patch("/", updateProfile)
profileRouter.delete("/", deleteProfile)

//View activity
profileRouter.get("/posts", getMyPosts)
profileRouter.get("/likes", getMyLikedPosts)

export default profileRouter