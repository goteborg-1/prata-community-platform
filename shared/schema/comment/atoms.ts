import z from "zod";
import { AVATAR_COLORS } from "../../constants.js";

// --- Atoms ---
export const isAnonymous = z.boolean().default(false);
export const isPsychologist = z.boolean().default(false);
export const content = z.string().trim().min(1, "Kommentarstext krävs").max(1000, "Kommentaren får inte vara längre än 1000 tecken");
export const populatedUserSchema = z.object({id: z.string(), displayName: z.string(), avatarColor: z.enum(AVATAR_COLORS)})


