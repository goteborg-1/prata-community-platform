import express from "express"
import { getAllComments, createComment, updateComment, deleteComment, toggleCommentLike } from "../controllers/comments.controller.js"
import { checkAuth } from "../middleware/checkAuth.js";

// mergeParams -> lets us merge route modules
const commentRouter = express.Router({ mergeParams: true });


// The initial path is set in app.ts
commentRouter.get("/", getAllComments);
commentRouter.post("/", checkAuth, createComment);
commentRouter.patch("/:commentId", checkAuth, updateComment);
commentRouter.delete("/:commentId", checkAuth, deleteComment);
commentRouter.patch("/:commentId/like", checkAuth, toggleCommentLike)

export default commentRouter
