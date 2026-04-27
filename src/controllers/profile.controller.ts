import bcrypt from "bcrypt"
import { Controller } from "../types/index.types.js"
import { createError } from "../utils/createError.js"
import { UserModel } from "../models/User.model.js"
import { PostModel } from "../models/Post.model.js"
import { CommentModel } from "../models/Comment.model.js"
import { updateProfileBody } from "../types/users.types.js"

export const getProfile: Controller = async (req, res) => {
  const user = req.user

  if(!user) {
    throw createError("Not authenticated", 401, "NOT_AUTHENTICATED")
  }

  res.json({
    status: "success",
    data: user
  })
}

export const updateProfile: Controller<{}, updateProfileBody> = async (req, res) => {
  const user = req.user

  if(!user) {
    throw createError("Not authenticated", 401, "NOT_AUTHENTICATED")
  }

  const {displayName, password} = req.body
  const updateData: Partial<{displayName: string, password: string}> = {}

  if(displayName) updateData.displayName = displayName
  if(password) updateData.password = await bcrypt.hash(password, 10)

  if(Object.keys(updateData).length === 0) {
    throw createError("No fields to update - provide at least displayName or password", 400, "NO_UPDATE_FIELDS")
  }

  const updatedUser = await UserModel.findByIdAndUpdate(
    user.userId,
    updateData,
    {
      new: true,
      runValidators: true
    }
  ).select("-password")

  if(!updatedUser) {
    throw createError("User no longer exists", 404, "USER_NOT_FOUND")
  }

  res.json({
    status: "success",
    data: updatedUser
  })
}

export const deleteProfile: Controller = async (req, res) => {
  const user = req.user
  
  if(!user) {
    throw createError("Not authenticated", 401, "NOT_AUTHENTICATED")
  }

  const id = user.userId

  await PostModel.deleteMany({userId: id})
  await CommentModel.deleteMany({userId: id})
  await PostModel.updateMany(
    {likedBy: id},
    {$pull: {likedBy: id}}
  )
  await UserModel.findByIdAndDelete(id)

  res.status(204).send()
}

export const getMyPosts: Controller = async (req, res) => {
  const user = req.user
  
  if(!user) {
    throw createError("Not authenticated", 401, "NOT_AUTHENTICATED")
  }

  res.json({
    status: "success",
    data: user.createdPosts
  })
}

export const getMyLikedPosts: Controller = async (req, res) => {
  const user = req.user
  
  if(!user) {
    throw createError("Not authenticated", 401, "NOT_AUTHENTICATED")
  }

  res.json({
    status: "success",
    data: user.likedPosts
  })
}