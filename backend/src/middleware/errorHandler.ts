import { Request, Response } from "express";
import { ZodError } from "@prata/shared"
import type { ErrorMiddleWare } from "../types/index.types.js";
import { AppError } from "../errors/AppError.js";

export const errorHandler: ErrorMiddleWare = (err, req, res, next) => {
  const isDevelopment = process.env.NODE_ENV === "development"
  const isOperational = err instanceof AppError && err.isOperational

  //Internal logging
  if(!isOperational) {
    console.error("UNEXPECTED ERROR: ", {
      timestamp: new Date().toISOString(),
      method: req.method,
      path: req.path,
      message: err.message,
      stack: err.stack
    })
  } else {
    console.warn("Application error: ", {
      method: req.method,
      path: req.path,
      status: err.statusCode,
      message: err.message
    })
  }

  //Expected application errors
  if(err instanceof AppError) {
    return res.status(err.statusCode).json({
      message: err.message,
      errors: err.errors,
      ...(isDevelopment && {stack: err.stack})
    })
  }

  //Zod errors
  if(err instanceof ZodError) {
    return res.status(400).json({
      message: "Validation error",
      errors: err.flatten().fieldErrors
    })
  }

  //Duplicate errors
  if(err.code === 11000) {
    const field = Object.keys(err.keyValue ?? {})[0]
    return res.status(400).json({
      status: 400,
      code: "DUPLICATE_KEY_ERROR",
      message: `${field} is already in use`,
      path: req.path,
    })
  }

  //Mongoose ValidationError
  if(err.name === "ValidationError") {
    const errors = Object.values(err.errors ?? {}).map((e) => ({
      field: e.path,
      message: e.message
    }))
    return res.status(400).json({
      message: "Validation error",
      errors
    })
  }

  //Mongoose CastError
  if(err.name === "CastError") {
    return res.status(400).json({message: "Invalid ID-Format"})
  }

  //Anything else - unexpected 500 error
  res.status(500).json({
    message: isDevelopment ? err.message : "Unexpected server error",
    ...(isDevelopment && {stack: err.stack})
  })
}

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