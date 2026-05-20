import type { NextFunction, Request, Response } from "express"
import { AppError } from "../errors/AppError.js"
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
  statusCode?: number
  code?: number | string
  keyValue?: Record<string, unknown>
  errors?: Record<string, { path: string; message: string }>
}

export type AnyError = AppError | HttpError

export type ErrorMiddleWare = (
  err: AnyError,
  req: Request,
  res: Response,
  next: NextFunction
) => void

//Add user to req globally
declare global {
  namespace Express {
    interface Request {
      user: IUser
    }
  }
}