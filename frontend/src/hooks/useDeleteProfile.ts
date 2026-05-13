import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProfile } from "../api/profile.api";
import { removeToken } from "../utils/auth";

export function useDeleteProfile() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteProfile,
    onSuccess: () => {
      removeToken()
      queryClient.clear()
      window.location.href = "/"
    }
  })
}