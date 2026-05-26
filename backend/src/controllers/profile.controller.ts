import * as error from "../errors/AppError.js"
import { Controller } from "../types/index.types.js"
import { UserModel } from "../models/User.model.js"
import { PostModel } from "../models/Post.model.js"
import { CommentModel } from "../models/Comment.model.js"
import { UpdateProfileRequest, updateProfileSchema } from "@prata/shared"
import { hashPassword } from "../utils/password.js"

export const getProfile: Controller = async (req, res) => {
  const user = req.user

  if(!user) throw new error.UnAuthorizedError()

  res.json({
    status: "success",
    data: user
  })
}

export const updateProfile: Controller<{}, UpdateProfileRequest> = async (req, res) => {
  const user = req.user

  if(!user) throw new error.UnAuthorizedError()

  const validatedData = updateProfileSchema.parse(req.body)

  if(Object.keys(validatedData).length === 0) throw new error.ValidationError("No fields to update")

  const updateData: UpdateProfileRequest = {...validatedData}
  if(validatedData.password) updateData.password = await hashPassword(validatedData.password)


  const updatedUser = await UserModel.findByIdAndUpdate(
    user.id,
    updateData,
    {
      new: true,
      runValidators: true
    }
  ).select("-password")

  if(!updatedUser) throw new error.UnAuthorizedError()

  res.json({
    status: "success",
    data: updatedUser
  })
}

export const deleteProfile: Controller = async (req, res) => {
  const user = req.user
  if(!user) throw new error.UnAuthorizedError()

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
  if(!user) throw new error.UnAuthorizedError()
  
  const id = user.id
  const posts = await PostModel.find({ userId: id }).populate("userId", "displayName avatarColor")

  res.json({
    status: "success",
    data: posts.map((post) => ({
      ...post.toJSON(),
      isLiked: true,
    }))
  })
}

export const getMyLikedPosts: Controller = async (req, res) => {
  const user = req.user
  if(!user) throw new error.UnAuthorizedError()

  const id = user.id
  const posts = await PostModel.find({ likedBy: id }).populate("userId", "displayName avatarColor")

  res.json({
    status: "success",
    data: posts.map((post) => ({
      ...post.toJSON(),
      isLiked: true,
    }))
  })
}