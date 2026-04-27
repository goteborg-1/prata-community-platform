import jwt from "jsonwebtoken"
import { Middleware } from "../types/index.types.js";
import { createError } from "../utils/createError.js";
import { UserModel } from "../models/User.model.js";

export const checkAuth: Middleware = async (req, res, next) => {
  const authHeader = req.headers.authorization

  if(!authHeader || !authHeader.startsWith("Bearer ")) {
    throw createError("No token found - please login", 401, "TOKEN_NOT_FOUND")
  }

  const token = authHeader.split(" ")[1]
  if(!token) {
    throw createError("Malformed authorization header - expected 'Bearer <token>'", 401, "INVALID_TOKEN_FORMAT")
  }

  const secret = process.env.JWT_SECRET!

  //Decode token
  const decoded = jwt.verify(token, secret) as {userId: string}

  //Find user by id and exclude password
  const user = await UserModel.findById(decoded.userId)

  if(!user) {
    throw createError("User no longer exists - please login again", 401, "USER_NOT_FOUND_OR_DELETED")
  }

  req.user = user
  next()
}