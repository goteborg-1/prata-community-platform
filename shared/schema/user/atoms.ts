import z from "zod"
import { AVATAR_COLORS } from "../../constants"

export const googleId = z
  .string()
  .optional()

export const handle = z
  .string()
  .min(3, "Användarnamnet måste vara minst 3 tecken")
  .max(30, "Användarnamnet får inte vara längre än 30 tecken")
  .regex(/^[a-zA-Z0-9_]+$/, "Användarnamnet får bara innehålla bokstäver, siffror och understreck")
  .transform((val) => val.toLowerCase().trim())

export const displayName = z
  .string()
  .max(50, "DisplayName cannot be longer than 50 characters")
  .trim()
  .optional()

export const email = z
  .email("Ange en giltig e-postadress")
  .transform((val) => val.toLowerCase().trim())

export const password = z
  .string()
  .min(8, "Lösenordet måste vara minst 8 tecken")
  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^\s]+$/, "Lösenordet måste innehålla minst en stor bokstav, en liten bokstav och en siffra")

export const role = z
  .preprocess(
    (val) => (typeof val === "string" ? val.toLowerCase() : val), 
    z.enum(["user", "admin", "psychologist"])
  )
  .default("user");

export const avatarColor = z
  .enum(AVATAR_COLORS)
  .default("#84A59D")