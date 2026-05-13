import z from "zod"
import { categories, categoriesQuery, description, id, isAnonymous, title, triggerTags, triggerTagsQuery } from "./atoms.js"

export const postParamsSchema = z.object({id})

export const getPostsQuerySchema = z.object({
  categories: categoriesQuery.optional(),
  triggerTags: triggerTagsQuery.optional(),
  search: z.string().optional(),
  sort: z.enum(["newest", "popular"]).default("newest"),
  page: z.string().regex(/^\d+$/).default("1").transform(Number),
  limit: z.string().regex(/^\d+$/).default("5").transform(Number)
})

export const createPostSchema = z.object({
  isAnonymous,
  title,
  description,
  categories,
  triggerTags,
})

export const updatePostSchema = z.object({
  title,
  description,
  categories,
  triggerTags
}).partial()

export const updatePostSchemaFrontEnd = z.object({
  title,
  description,
  categories,
  triggerTags
})

// --- Types ---
export type PostParams = z.infer<typeof postParamsSchema>;
export type GetPostsQuery = z.input<typeof getPostsQuerySchema>;
export type CreatePostRequest = z.infer<typeof createPostSchema>;
export type UpdatePostRequest = z.infer<typeof updatePostSchemaFrontEnd>;