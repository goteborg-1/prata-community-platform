import { Middleware } from "../types/index.types.js";
import { createError } from "../utils/createError.js";

export const checkAdmin: Middleware = (req, res, next) => {
  const user = req.user

  if(!user) {
    throw createError("Not authenticated", 401, "NOT_AUTHENTICATED")
  }

  if(user.role !== "admin") {
    throw createError("Access denied: Admin privileges required", 403, "FORBIDDEN_ADMIN_ONLY")
  }

  next()
}