import { useQuery } from "@tanstack/react-query";
import { getComment } from "../api/comments.api";

export function useComment(postId: string | undefined, commentId: string | undefined) {
  const query = useQuery({
    queryKey: ["comment", commentId],
    queryFn: () => getComment(postId!, commentId!),
    enabled: !!commentId
  })

  return { 
    comment: query.data, 
    isLoading: query.isLoading, 
    error: query.error ? query.error.message : ""
  }
}