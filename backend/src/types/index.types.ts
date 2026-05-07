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
  code?: number | string,
  status?: number,
  keyValue?: Record<string, string>
}

//Add user to req globally
declare global {
  namespace Express {
    interface Request {
      user: IUser
    }
  }
}