import z from "zod"
import { comment, commentId, postId, reason, reportedBy } from "./atoms.js"

export const createReportSchema = z.object({
  postId,
  commentId,
  reason,
  comment
})

// --- Types ---
export type CreateReportRequest = z.infer<typeof createReportSchema>;