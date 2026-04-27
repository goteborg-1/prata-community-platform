import type { NextFunction, Request, Response } from "express"
import { IUser } from "../models/User.model.js"

//P - Params, B - Body, Q - Query
export type Controller<P = {}, B = {}, Q = {}> = (
  req: Request<P, any, B, Q>, 
  res: Response,
  next: NextFunction
) => void

export type Middleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => void

export interface HttpError extends Error {
  code?: string,
  status?: number
}

//Add user to req globally
declare global {
  namespace Express {
    interface Request {
      user: IUser
    }
  }
}