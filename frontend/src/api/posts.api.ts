import { api } from "../utils/api"
import type { Post, GetPostsQuery } from "@shared"

export const getPosts = async (params: GetPostsQuery): Promise<Post[]> => {
  const res = await api.get("/posts", { params })
  return res.data.data
}

export const getPost = async (postId: string): Promise<Post> => {
  const res = await api.get(`/posts/${postId}`)
  return res.data.data
}

export const toggleLike = async (postId: string) => {
  const res = await api.patch(`/posts/${postId}/like`)
  return res.data.data
}

export const deletePost = async (postId: string) => {
  await api.delete(`/posts/${postId}`)
}