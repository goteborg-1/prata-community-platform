import { Controller } from "../types/index.types.js"
import { createError } from "../utils/createError.js"
import { UserModel } from "../models/User.model.js"
import { PostModel } from "../models/Post.model.js"
import { CommentModel } from "../models/Comment.model.js"
import { UpdateProfileRequest, updateProfileSchema } from "@shared"
import { hashPassword } from "../utils/password.js"

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

export const updateProfile: Controller<{}, UpdateProfileRequest> = async (req, res) => {
  const user = req.user

  if(!user) {
    throw createError("Not authenticated", 401, "NOT_AUTHENTICATED")
  }

  const validatedData = updateProfileSchema.parse(req.body)

  if(Object.keys(validatedData).length === 0) {
    throw createError("No fields to update - provide at least displayName or password", 400, "NO_UPDATE_FIELDS")
  }

  const updateData: Partial<UpdateProfileRequest> = {...validatedData}
  if(validatedData.password) updateData.password = await hashPassword(validatedData.password)


  const updatedUser = await UserModel.findByIdAndUpdate(
    user.id,
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

  const id = user.id

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
  
  const id = user.id
  const posts = await PostModel.find({ userId: id })

  res.json({
    status: "success",
    data: posts
  })
}

export const getMyLikedPosts: Controller = async (req, res) => {
  const user = req.user
  
  if(!user) {
    throw createError("Not authenticated", 401, "NOT_AUTHENTICATED")
  }

  const id = user.id
  const posts = await PostModel.find({ likedBy: id })

  res.json({
    status: "success",
    data: posts
  })
}