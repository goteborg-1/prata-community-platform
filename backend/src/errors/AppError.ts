import type { ZodError } from "@prata/shared"

type ZodIssue = ZodError["issues"][number]

//Base class for all expected application errors
export class AppError extends Error {
  public statusCode: number
  public isOperational: boolean
  public errors?: ZodIssue[] | Array<{ field: string; message: string }>

  constructor(message: string, statusCode: number) {
    super(message)
    this.name = this.constructor.name
    this.statusCode = statusCode
    this.isOperational = true // Differ application errors from programmatic errors
    Error.captureStackTrace(this, this.constructor)
  }
}

//400 - Validation error, faulty in-data
export class ValidationError extends AppError {
  public errors: ZodIssue[]

  constructor(message: string = "Validation Error", errors: ZodIssue[] = []) {
    super(message, 400)
    this.errors = errors
  }
}

//401 - Authorization is required
export class UnAuthorizedError extends AppError {
  constructor(message: string = "Authorization is required") {
    super(message, 401)
  }
}

//403 - Access Denied
export class ForbiddenError extends AppError {
  constructor(message: string = "Access Denied") {
    super(message, 403)
  }
}

//404 - Not Found
export class NotFoundError extends AppError {
  constructor(message: string = "The resource could not be located") {
    super(message, 404)
  }
}

//409 - Conflict Error
export class ConflictError extends AppError {
  constructor(message: string = "The resource is already present") {
    super(message, 409)
  }
}