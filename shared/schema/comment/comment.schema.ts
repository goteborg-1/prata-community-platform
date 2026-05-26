import z from "zod"
import { content, isAnonymous, isPsychologist } from "./atoms.js"

export const commentSchema = z.object({
  id: z.string(),
  postId: z.string(),
  userId: z.string().nullable(),
  isEdited: z.boolean().default(false),
  likedBy: z.array(z.string()).default([]),
  likeCount: z.number().nonnegative(),
  createdAt: z.string(),
  updatedAt: z.string(),
  content,
  isAnonymous,
  isPsychologist,
  username: z.string().nullable().optional(),
  isLikedByCurrentUser: z.boolean().optional(),
  isOwnedByCurrentUser: z.boolean().optional()
})


export type Comment = z.infer<typeof commentSchema>