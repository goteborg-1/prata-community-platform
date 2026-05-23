import * as error from "../errors/AppError.js"
import jwt from "jsonwebtoken"
import { Middleware } from "../types/index.types.js";
import { UserModel } from "../models/User.model.js";

export const checkAuth: Middleware = async (req, res, next) => {
  const authHeader = req.headers.authorization

  if(!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new error.UnAuthorizedError()
  }

  const token = authHeader.split(" ")[1]
  if(!token) throw new error.UnAuthorizedError()

  const secret = process.env.JWT_SECRET!

  //Decode token
  const decoded = jwt.verify(token, secret) as {id: string}

  //Find user by id and exclude password
  const user = await UserModel.findById(decoded.id)

  if(!user) throw new error.NotFoundError()

  req.user = user
  next()
}