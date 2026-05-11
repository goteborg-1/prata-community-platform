import z from "zod";

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

const CATEGORIES = ["relationships", "family", "parenting", "stress", "anxiety", "loneliness", "grief-and-loss", "depression", "other"] as const

export const categories = toLowerCaseArray.pipe(
  z.array(z.enum(CATEGORIES)).min(1, "At least one category is required")
)

export const triggerTags = toLowerCaseArray.pipe(
  z.array(
    z.enum(["self-harm", "suicidal-thoughts", "substance-abuse", "gambling", "eating-disorders", "body-image", "abuse", "domestic-violence", "trauma"])
  )
).default([])

export const likedBy = z.array(z.string()).default([])

// --- Query Atoms ---
// Ingen min(1) här som på "categories". main page behöver kunna hämta inlägg utan att bestämma kategori
export const categoriesQuery = stringOrArray(toLowerCaseArray.pipe(z.array(z.enum(CATEGORIES))))
export const triggerTagsQuery = stringOrArray(triggerTags)