import { Controller } from "../types/index.types.js"
import { createError } from "../utils/createError.js"

export const getProfile: Controller = async (req, res) => {
  const user = req.user

  if(!user) {
    throw createError("User not found", 404, "USER_NOT_FOUND")
  }

  res.json({
    success: true,
    data: user
  })
}

export const updateProfile: Controller = async (req, res) => {

}

export const deleteProfile: Controller = async (req, res) => {

}

export const getMyPosts: Controller = async (req, res) => {

}

export const getMyLikedPosts: Controller = async (req, res) => {

}