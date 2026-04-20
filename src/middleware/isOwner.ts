import { Middleware } from "../types/index.types.js";

export const isPostOwner: Middleware = (req, res, next) => {
  console.log("Kontrollera att det är användarens egna inlägg")
  next()
}

export const isCommentOwner: Middleware = (req, res, next) => {
  console.log("Kontrollera att det är användarens egna kommentar")
  next()
}