import * as error from "../errors/AppError.js"
import { Middleware } from "../types/index.types.js";

export const checkAdmin: Middleware = (req, res, next) => {
  const user = req.user

  if(!user) throw new error.UnAuthorizedError()

  if(user.role !== "admin") throw new error.ForbiddenError("Admin access required")

  next()
}