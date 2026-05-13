import z from "zod"
import { handle, email, displayName, role, googleId, password, avatarColor } from "./atoms.js"

export const userSchema = z.object({
  id: z.string(),
  googleId,
  handle,
  displayName,
  email,
  password: password.optional(),
  role,
  avatarColor,
  createdAt: z.string(),
  updatedAt: z.string()
})

export type User = z.infer<typeof userSchema>