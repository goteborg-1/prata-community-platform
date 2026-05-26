import type { User, GetUsersQuery, UpdateUserRoleRequest } from "@prata/shared"
import { api } from "../utils/api"

interface GetUsersResponse {
  status: string;
  data: User[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export const getUsers = async (params: GetUsersQuery): Promise<GetUsersResponse> => {
  const res = await api.get("/users", {
    params,
    paramsSerializer: (params) => {
      return new URLSearchParams(
        Object.entries(params).flatMap(([key, value]) =>
          Array.isArray(value) ? value.map(v => [key, v]) : [[key, String(value)]]
        )
      ).toString()
    }
  })
  return res.data
}

export const updateUserRole = async (postId: string, data: UpdateUserRoleRequest): Promise<User> => {
  const res = await api.patch(`/users/${postId}`, data)
  return res.data.data
}

export const deleteUser = async (postId: string) => {
  await api.delete(`/users/${postId}`)
}