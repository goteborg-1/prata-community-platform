import z from "zod"
import { categories, description, isAnonymous, likedBy, title, triggerTags, userId } from "./atoms"

export const PostSchema = z.object({
  id: z.string(),
  userId: userId.nullable(),
  isAnonymous,
  title,
  description,
  categories,
  triggerTags,
  likedBy: likedBy.optional(),
  likeCount: z.number().nonnegative(),
  createdAt: z.string(),
  updatedAt: z.string()
})

export type Post = z.infer<typeof PostSchema>