import { Request, Response } from "express"

export type Controller = (req: Request<{id: string}>, res: Response) => void

//Ta bort innan merge
export interface HttpError extends Error {
  code?: string,
  status?: number
}