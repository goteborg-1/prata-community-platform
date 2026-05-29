import z from "zod"
import { AVATAR_COLORS, SORT_OPTIONS, ROLE_OPTIONS } from "../constants.js"

// --- Populated User ---
export const populatedUserSchema = z.object({
  id: z.string(),
  displayName: z.string(),
  avatarColor: z.enum(AVATAR_COLORS),
  role: z.enum(ROLE_OPTIONS).optional()
})

// --- Pagination ---
export const search = z.string().optional()
export const sort = z.enum(SORT_OPTIONS).default("newest")
export const page = z.string().regex(/^\d+$/).default("1").transform(Number)
export const limit = z.string().regex(/^\d+$/).default("5").transform(Number)