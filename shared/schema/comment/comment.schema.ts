import z from "zod"
import { content, isAnonymous, isPsychologist } from "./atoms.js"
import { populatedUserSchema } from "../baseAtoms.js"

export const commentSchema = z.object({
  id: z.string(),
  postId: z.string(),
  userId: z.union([z.string(), populatedUserSchema]).nullable(),
  isEdited: z.boolean().default(false),
  likedBy: z.array(z.string()).default([]),
  likeCount: z.number().nonnegative(),
  createdAt: z.string(),
  updatedAt: z.string(),
  content,
  isAnonymous,
  isPsychologist,
  isLikedByCurrentUser: z.boolean().optional(),
  isOwnedByCurrentUser: z.boolean().optional(),
  isOwner: z.boolean().optional(),
  isOP: z.boolean().optional(),
})


export type Comment = z.infer<typeof commentSchema>