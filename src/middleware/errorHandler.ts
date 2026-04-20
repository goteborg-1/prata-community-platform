import { Request, Response, NextFunction } from "express";
import type { HttpError } from "../types/index.types.js";

// catch all other crazy route attempts
export function notFound(req: Request, res: Response): void {
  res.status(404).json({
    status: 404,
    code: "PAGE_DOES_NOT_EXIST",
    message: "Not found",
    path: req.path,
    timestamp: new Date().toISOString()
  })
}

export function errorHandler(
  err: HttpError, // extended with Error type
  req: Request,
  res: Response,
  next: NextFunction
): void {
  console.error(err.stack)

  // gets data from controller or sends default
  const status = err.status || 500
  const code = err.code || "SOMETHING_WENT_WRONG"


  res.status(status).json({
    status: status,
    code: code,
    message: err.message || "Something went wrong", // err.message is property on every JS Error object. (new Error ("whatever I want"))
    path: req.path,          // which URL caused it
    timestamp: new Date().toISOString()
  })
}

