import { Middleware } from "../types/index.types.js";

export const checkAuth: Middleware = (req, res, next) => {
  console.log("Kontrollera att användaren är inloggad")
  next()
}