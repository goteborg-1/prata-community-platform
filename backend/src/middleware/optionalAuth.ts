import jwt from "jsonwebtoken"
import { Middleware } from "../types/index.types.js"
import { UserModel } from "../models/User.model.js"

export const optionalAuth: Middleware = async (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next() // No token — go forward without user
  }

  const token = authHeader.split(" ")[1]
  const secret = process.env.JWT_SECRET!

  if (!token) return next() // No token — go forward without user

  try {
    const decoded = jwt.verify(token, secret) as unknown as { id: string }
    const user = await UserModel.findById(decoded.id)
    if (user) req.user = user
  } catch {
    // Invalid token - go forward without user
  }

  next()
}