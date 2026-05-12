import { useQuery } from "@tanstack/react-query";
import { api } from "../utils/api";
import type { Post } from "@shared";

export function usePost(postId: string | undefined) {
  const query = useQuery({
    queryKey: ["post", postId],
    queryFn: async () => {
      const res = await api.get(`/posts/${postId}`)
      return res.data.data as Post
    },
    enabled: !!postId
  })

  return { 
    post: query.data, 
    isLoading: query.isLoading, 
    error: query.error ? query.error.message : ""
  }
}