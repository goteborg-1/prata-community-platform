import express from "express"
import { getAllComments, createComment, updateComment, deleteComment } from "../controllers/comments.controller.js"

const commentRouter = express.Router();


// The initial path is set in app.ts
commentRouter.get("/", getAllComments);
commentRouter.post("/", createComment);
commentRouter.patch("/:commentId", updateComment);
commentRouter.delete("/:commentId", deleteComment);

export default commentRouter
