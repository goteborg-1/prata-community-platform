import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleLike } from "../api/posts.api";

export function useToggleLike() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: toggleLike,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] })
      queryClient.invalidateQueries({ queryKey: ["post"]})
    }
  })
}