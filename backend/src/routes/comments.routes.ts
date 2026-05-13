import express from "express"
import { getAllComments, createComment, updateComment, deleteComment, toggleCommentLike } from "../controllers/comments.controller.js"
import { checkAuth } from "../middleware/checkAuth.js";
import { optionalAuth } from "../middleware/optionalAuth.js";
import { isCommentOwner } from "../middleware/isOwner.js";

// mergeParams -> lets us merge route modules
const commentRouter = express.Router({ mergeParams: true });


// The initial path is set in app.ts
commentRouter.get("/", optionalAuth, getAllComments);
commentRouter.post("/", checkAuth, createComment);
commentRouter.patch("/:commentId", checkAuth, isCommentOwner, updateComment);
commentRouter.delete("/:commentId", checkAuth, isCommentOwner, deleteComment);
commentRouter.patch("/:commentId/like", checkAuth, toggleCommentLike)

export default commentRouter
