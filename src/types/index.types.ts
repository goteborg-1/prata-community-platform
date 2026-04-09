import type { NextFunction, Request, Response } from "express"

//P - Params, B - Body, Q - Query
export type Controller<P = {}, B = {}, Q = {}> = (
  req: Request<P, any, B, Q>, 
  res: Response,
  next: NextFunction
) => void

//Ta bort innan merge
export interface HttpError extends Error {
  code?: string,
  status?: number
}