import z from "zod";


// --- Atoms ---
export const isAnonymous = z.boolean().default(false);
export const isPsychologist = z.boolean().default(false);
export const content = z.string().trim().min(1, "Comment text required").max(1000, "Comment cannot be longer than 1000 characters");


