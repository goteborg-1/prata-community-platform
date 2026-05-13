import { useQuery } from "@tanstack/react-query";
import { getPost } from "../api/posts.api";

export function usePost(postId: string | undefined) {
  const query = useQuery({
    queryKey: ["post", postId],
    queryFn: () => getPost(postId!),
    enabled: !!postId
  })

  return { 
    post: query.data, 
    isLoading: query.isLoading, 
    error: query.error ? query.error.message : ""
  }
}