import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../context/useAuth";
import { deleteProfile } from "../api/profile.api";

export function useDeleteProfile() {
  const { logout } = useAuth()

  return useMutation({
    mutationFn: deleteProfile,
    onSuccess: () => {
      logout()
    }
  })
}