import z from "zod"
import { comment, postId, reason, reportedBy, status } from "./atoms.js"
import { populatedUserSchema } from "../baseAtoms.js"

export const ReportSchema = z.object({
  id: z.string(),
  postId,
  reportedBy: z.union([reportedBy, populatedUserSchema]),
  reason,
  comment,
  status,
  createdAt: z.string(),
  updatedAt: z.string()
})

export type Report = z.infer<typeof ReportSchema>