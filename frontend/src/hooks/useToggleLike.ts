import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../utils/api";

export function useToggleLike() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (postId: string) => {
      const res = await api.patch(`/posts/${postId}/like`)
      return res.data.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["post"]})
    }
  })
}