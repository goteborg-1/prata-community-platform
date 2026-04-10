import { HttpError } from "../types/index.types.js"

// makes sure errors have same pattern as error middleware
export function createError(message: string, status: number, code: string): HttpError {
  const err = new Error(message) as HttpError
  err.status = status
  err.code = code
  return err
}