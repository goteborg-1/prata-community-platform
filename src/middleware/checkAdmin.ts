import { Middleware } from "../types/index.types.js";

export const checkAdmin: Middleware = (req, res, next) => {
  console.log("Kontrollera att användaren har administratörsrättigheter")
  next()
}