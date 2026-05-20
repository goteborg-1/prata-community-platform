import z from "zod"
import { AVATAR_COLORS } from "../../constants"

export const googleId = z
  .string()
  .optional()

export const handle = z
  .string()
  .min(3, "Handle must be at least 3 characters")
  .max(30, "Handle cannot be longer than 30 characters")
  .regex(/^[a-zA-Z0-9_]+$/, "Handle can only contain letters, numbers and underscores")
  .transform((val) => val.toLowerCase().trim())

export const displayName = z
  .string()
  .max(50, "DisplayName cannot be longer than 50 characters")
  .trim()
  .optional()

export const email = z
  .email("Please enter a valid email address")
  .transform((val) => val.toLowerCase().trim())

export const password = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^\s]+$/, "Password must include at least one capital, lowercase and number")

export const role = z
  .preprocess(
    (val) => (typeof val === "string" ? val.toLowerCase() : val), 
    z.enum(["user", "admin", "psychologist"])
  )
  .default("user");

export const avatarColor = z
  .enum(AVATAR_COLORS)
  .default("#84A59D")