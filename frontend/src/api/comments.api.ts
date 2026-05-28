import { api } from "../utils/api"
import type { Comment } from "@prata/shared"

export const getComment = async (postId: string, commentId: string): Promise<Comment> => {
  const res = await api.get(`/posts/${postId}/comments/${commentId}`)
  return res.data.data
}