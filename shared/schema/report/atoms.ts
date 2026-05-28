import z from "zod"
import { REPORT_OPTIONS, STATUS_OPTIONS } from "../../constants.js"

export const postId = z.string()
export const commentId = z.string().optional()
export const reportedBy = z.string()
export const reason = z.enum(REPORT_OPTIONS, "Anledning till rapporteringen krävs")
export const comment = z.string().max(500, "Kommentaren får inte vara längre än 500 tecken").optional()
export const status = z.enum(STATUS_OPTIONS)