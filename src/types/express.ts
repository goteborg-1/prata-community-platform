import { Request, Response } from "express"

export type Controller = (req: Request<{id: string}>, res: Response) => void