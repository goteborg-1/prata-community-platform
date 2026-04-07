import { Request, Response } from "express"

export type Controller = (req: Request, res: Response) => void

export interface HttpError extends Error {
  code?: string,
  status?: number
}