import type { Post, UpdateProfileRequest } from "@shared"
import { api } from "../utils/api"

export const getProfile = async () => {
  const res = await api.get("/profile")
  return res.data.data
}

export const updateProfile = async (data: UpdateProfileRequest) => {
  const res = await api.patch("/profile", data)
  return res.data.data
}

export const deleteProfile = async () => {
  await api.delete("/profile")
}

export const getMyPosts = async (): Promise<Post[]> => {
  const res = await api.get("/profile/posts")
  return res.data.data
}

export const getMyLikedPosts = async (): Promise<Post[]> => {
  const res = await api.get("/profile/likes")
  return res.data.data
}