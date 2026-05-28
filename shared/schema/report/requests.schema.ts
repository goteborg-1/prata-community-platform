import z from "zod"
import { comment, postId, reason, reportedBy } from "./atoms.js"

export const createReportSchema = z.object({
  postId,
  reason,
  comment
})

// --- Types ---
export type CreateReportRequest = z.infer<typeof createReportSchema>;