import { api } from "../utils/api"
import type { Post, GetPostsQuery } from "@prata/shared"

interface GetPostsResponse {
  status: string;
  data: Post[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export const getPosts = async (params: GetPostsQuery): Promise<GetPostsResponse> => {
  const res = await api.get("/posts", {
    params,
    paramsSerializer: (params) => {
      return new URLSearchParams(
        Object.entries(params).flatMap(([key, value]) =>
          Array.isArray(value) ? value.map(v => [key, v]) : [[key, String(value)]]
        )
      ).toString()
    }
  })
  return res.data
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