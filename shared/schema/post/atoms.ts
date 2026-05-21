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

export const title = z.string().trim().min(1, "Titel krävs").max(100, "Titeln får inte vara längre än 100 tecken")

export const description = z.string().trim().min(1, "Beskrivning krävs").max(1000, "Beskrivningen får inte vara längre än 1000 tecken")

export const categories = toLowerCaseArray.pipe(
  z.array(z.enum(CATEGORY_OPTIONS)).min(1, "Minst en kategori krävs")
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