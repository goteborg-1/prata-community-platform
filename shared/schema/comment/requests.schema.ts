import z from "zod"

import { content, isAnonymous, isPsychologist } from "./atoms.js"

export const commentParamsSchema = z.object({
  postId: z.string(), 
  commentId: z.string()
});

export const createCommentSchema = z.object({
  content,
  isAnonymous,
  isPsychologist
})

export const updateCommentSchema = z.object({
  content
})

// --- Types ---
export type CommentParams = z.infer<typeof commentParamsSchema>;
export type CreateCommentRequest = z.infer<typeof createCommentSchema>;
export type UpdateCommentRequest = z.infer<typeof updateCommentSchema>;
