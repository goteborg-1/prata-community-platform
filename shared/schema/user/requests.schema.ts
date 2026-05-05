import z from "zod"
import { handle, email, displayName, password, role } from "./atoms.js"

export const createUserSchema = z.object({
  handle,
  displayName,
  email,
  password
})

export const loginUserSchema = z.object({
  email,
  password: z.string()
})

export const googleLoginSchema = z.object({
  idToken: z.string().min(1, "Google ID Token is required")
})

export const updateProfileSchema = z.object({
  displayName,
  password: password.optional()
})

export const updateUserRoleSchema = z.object({
  role
})

export const getUsersQuerySchema = z.object({
  role: role.optional(),
  search: z.string().optional(),
  sort: z.enum(["name", "newest"]).optional(),
  page: z.string().regex(/^\d+$/).default("1").transform(Number),
  limit: z.string().regex(/^\d+$/).default("5").transform(Number)
})

export const UserParamsSchema = z.object({
  id: z.string()
})

export const getUserParamsSchema = z.object({
  handle
})


//Types
export type createUserBody = z.infer<typeof createUserSchema>
export type loginUserBody = z.infer<typeof loginUserSchema>
export type googleLoginBody = z.infer<typeof googleLoginSchema>

export type updateProfileBody = z.infer<typeof updateProfileSchema>
export type updateUserRoleParams = z.infer<typeof updateUserRoleSchema>

export type getUsersQuery = z.infer<typeof getUsersQuerySchema>
export type userParams = z.infer<typeof UserParamsSchema>
export type getUserParams = z.infer<typeof getUserParamsSchema>