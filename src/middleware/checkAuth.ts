import jwt from "jsonwebtoken"
import { Middleware } from "../types/index.types.js";
import { createError } from "../utils/createError.js";
import { UserModel } from "../models/User.model.js";

export const checkAuth: Middleware = async (req, res, next) => {
  const authHeader = req.headers.authorization

  if(!authHeader || !authHeader.startsWith("Bearer ")) {
    throw createError("No token found, please login", 401, "TOKEN_NOT_FOUND")
  }

  const token = authHeader.split(" ")[1]
  const secret = process.env.JWT_SECRET

  if(!token) {
    throw createError("Malformed authorization header", 401, "INVALID_TOKEN_FORMAT")
  }

  if(!secret) {
    throw createError("JWT_SECRET is missing", 500, "CONFIG_ERROR")
  }

  //Decode token
  const decoded = jwt.verify(token, secret) as unknown as {id: string}

  //Find user by id and exclude password
  const user = await UserModel.findById(decoded.id).select("-password")

  if(!user) {
    throw createError("User could not be found", 401, "USER_NOT_FOUND")
  }

  req.user = user
  next()
}