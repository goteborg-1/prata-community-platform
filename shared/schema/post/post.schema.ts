import z from "zod"
import { categories, commentCount, description, isAnonymous, likedBy, title, triggerTags, userId } from "./atoms.js"
import { populatedUserSchema } from "../baseAtoms.js"

export const PostSchema = z.object({
  id: z.string(),
  userId: z.union([userId, populatedUserSchema]).nullable(),
  isAnonymous,
  title,
  description,
  categories,
  triggerTags,
  likedBy: likedBy.optional(),
  likeCount: z.number().nonnegative(),
  isLiked: z.boolean().optional(),
  isOwner: z.boolean().optional(),
  commentCount,
  createdAt: z.string(),
  updatedAt: z.string()
})

export type Post = z.infer<typeof PostSchema>