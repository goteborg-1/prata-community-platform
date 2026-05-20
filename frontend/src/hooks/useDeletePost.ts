import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deletePost } from "../api/posts.api"

export function useDeletePost() {
  const queryClient = useQueryClient()

  return useMutation({    
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] })
      queryClient.invalidateQueries({ queryKey: ["post"]})
    },
  })
}