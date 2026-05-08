import z from "zod";

// --- Helpers ---
const toLowerCaseArray = z.array(z.string().toLowerCase().trim())
const stringOrArray = <T extends z.ZodType>(schema: T) =>
  z.preprocess(
    (val) => (typeof val === "string" ? [val] : val),
    schema
  )

// --- Atoms ---
export const id = z.string()

export const userId = z.string()

export const isAnonymous = z.boolean().default(false)

export const title = z.string().trim().min(3, "Title cannot be shorter than 3 characters").max(100, "Title cannot be longer than 100 character")

export const description = z.string().trim().min(1, "Description is required")

export const categories = toLowerCaseArray.pipe(
  z.array(
    z.enum(["relationships", "family", "parenting", "stress", "anxiety", "loneliness", "grief-and-loss", "depression", "other"])
  )
)

export const triggerTags = toLowerCaseArray.pipe(
  z.array(
    z.enum(["self-harm", "suicidal-thoughts", "substance-abuse", "gambling", "eating-disorders", "body-image", "abuse", "domestic-violence", "trauma"])
  )
).default([])

export const likedBy = z.array(z.string()).default([])

// --- Query Atoms ---
export const categoriesQuery = stringOrArray(categories)
export const triggerTagsQuery = stringOrArray(triggerTags)