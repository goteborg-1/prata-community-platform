import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateProfile } from "../api/profile.api"
import type { UpdateProfileRequest } from "@shared"

export function useUpdateProfile() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: UpdateProfileRequest) => updateProfile(data),
    onSuccess: (updatedUser) => {
      queryClient.setQueryData(["auth-user"], updatedUser)
    }
  })
}