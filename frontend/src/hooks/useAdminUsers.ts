import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { getUsers, deleteUser, updateUserRole } from "../api/admin.api"
import type { GetUsersQuery } from "@prata/shared"

export function useAdminUsers(params: GetUsersQuery) {
  return useQuery({
    queryKey: ["admin", "users", params],
    queryFn: () => getUsers(params),
  })
}

export function useDeleteUser() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => deleteUser(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin", "users"] }),
  })
}

export function useUpdateUserRole() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, role }: { id: string; role: "admin" | "user" | "psychologist" }) =>
      updateUserRole(id, {role}),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin", "users"] }),
  })
}