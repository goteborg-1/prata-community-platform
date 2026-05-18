import z from "zod";
import { TRIGGER_OPTIONS, CATEGORY_OPTIONS, AVATAR_COLORS } from "../../constants.js"

// --- Helpers ---
const toLowerCaseArray = z.array(z.string().toLowerCase().trim())
const stringOrArray = <T extends z.ZodType>(schema: T) =>
  z.preprocess((val) => {
    if(typeof val === "undefined") return []
    return typeof val === "string" ? [val] : val
  }, schema)

// --- Atoms ---
export const id = z.string()

export const userId = z.string()

export const isAnonymous = z.boolean().default(false)

export const title = z.string().trim().min(1, "Title is required").max(100, "Title cannot be longer than 100 character")

export const description = z.string().trim().min(1, "Description is required").max(1000, "Description cannot be longer than 1000 characters")

export const categories = toLowerCaseArray.pipe(
  z.array(z.enum(CATEGORY_OPTIONS)).min(1, "At least one category is required")
)

export const triggerTags = toLowerCaseArray.pipe(
  z.array(
    z.enum(TRIGGER_OPTIONS)
  )
).default([])

export const likedBy = z.array(z.string()).default([])

export const commentCount = z.number().nonnegative().default(0)

// --- Populated User ---
export const populatedUserSchema = z.object({
  id,
  displayName: z.string(),
  avatarColor: z.enum(AVATAR_COLORS)
})

// --- Query Atoms ---
export const categoriesQuery = stringOrArray(z.array(z.enum(CATEGORY_OPTIONS)))
export const triggerTagsQuery = stringOrArray(z.array(z.enum(TRIGGER_OPTIONS))).default([])