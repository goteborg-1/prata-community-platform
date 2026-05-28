import z from "zod"
import { comment, commentId, postId, reason, reportedBy, status } from "./atoms.js"
import { populatedUserSchema } from "../baseAtoms.js"

export const ReportSchema = z.object({
  id: z.string(),
  postId,
  commentId,
  reportedBy: z.union([reportedBy, populatedUserSchema]),
  reason,
  comment,
  status,
  createdAt: z.string(),
  updatedAt: z.string()
})

export type Report = z.infer<typeof ReportSchema>