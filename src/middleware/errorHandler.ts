import { Request, Response, NextFunction } from "express";

export function notFound(req: Request, res: Response): void {
  res.status(404).json({
    status: 404,
    message: "Not found",
    path: req.path,
    timestamp: new Date().toISOString()
  })
}

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  console.error(err.stack)
  res.status(500).json({
    status: 500,
    message: err.message || "Something went wrong", // err.message is property on every JS Error object.
    path: req.path,          // which URL caused it
    timestamp: new Date().toISOString()
  })
}

