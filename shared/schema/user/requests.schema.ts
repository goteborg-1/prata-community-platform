import z from "zod"
import { handle, email, displayName, password, role } from "./atoms.js"
import { AVATAR_COLORS } from "../../constants.js"

export const createUserSchema = z.object({
  handle,
  displayName,
  email,
  password,
})

export const loginUserSchema = z.object({
  email,
  password
})

export const googleLoginSchema = z.object({
  idToken: z.string().min(1, "Google ID Token is required")
})

export const updateProfileSchema = z.object({
  handle,
  displayName,
  password,
  avatarColor: z.enum(AVATAR_COLORS)
}).partial()

export const updateUserRoleSchema = z.object({
  role
})

export const getUsersQuerySchema = z.object({
  role: z
    .preprocess((val) => {
      if (!val) return undefined;
      if (Array.isArray(val)) {
        return val.map(v => String(v).toLowerCase());
      }
      return [String(val).toLowerCase()];
    }, z.array(z.enum(["user", "admin", "psychologist"])))
    .optional(),
  search: z.string().optional(),
  sort: z.enum(["name", "newest"]).optional(),
  page: z.string().regex(/^\d+$/).default("1").transform(Number),
  limit: z.string().regex(/^\d+$/).default("5").transform(Number)
})

export const userParamsSchema = z.object({
  id: z.string()
})

export const getUserParamsSchema = z.object({
  handle
})


// --- Types ---
export type CreateUserRequest = z.infer<typeof createUserSchema>
export type LoginUserRequest = z.infer<typeof loginUserSchema>
export type GoogleLoginRequest = z.infer<typeof googleLoginSchema>

export type UpdateProfileRequest = z.infer<typeof updateProfileSchema>
export type UpdateUserRoleRequest = z.infer<typeof updateUserRoleSchema>

export type GetUsersQuery = z.infer<typeof getUsersQuerySchema>
export type UserParams = z.infer<typeof userParamsSchema>
export type GetUserParams = z.infer<typeof getUserParamsSchema>