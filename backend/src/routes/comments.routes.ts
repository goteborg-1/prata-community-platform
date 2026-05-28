import express from "express"
import { getAllComments, createComment, updateComment, deleteComment, toggleCommentLike, getCommentById } from "../controllers/comments.controller.js"
import { checkAuth } from "../middleware/checkAuth.js";
import { optionalAuth } from "../middleware/optionalAuth.js";
import { isCommentOwner } from "../middleware/isOwner.js";
import { isCommentOwnerOrAdmin } from "../middleware/isPostOwnerOrAdmin.js";

// mergeParams -> lets us merge route modules
const commentRouter = express.Router({ mergeParams: true });

/**
 * @openapi
 * /api/v1/posts/{postId}/comments:
 *   get:
 *     summary: Get all comments for a post
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of comments
 */
commentRouter.get("/", optionalAuth, getAllComments);

/**
 * @openapi
 * /api/v1/posts/{postId}/comments:
 *   get:
 *     summary: Get comment by ID
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Post returned successfully
 *       404:
 *         description: Post not found
 */
commentRouter.get("/:commentId", optionalAuth, getCommentById);

/**
 * @openapi
 * /api/v1/posts/{postId}/comments:
 *   post:
 *     summary: Create a comment on a post
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *               isAnonymous:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Comment created
 *       401:
 *         description: Not authenticated
 */
commentRouter.post("/", checkAuth, createComment);

/**
 * @openapi
 * /api/v1/posts/{postId}/comments/{commentId}:
 *   patch:
 *     summary: Update a comment
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Comment updated
 *       401:
 *         description: Not authenticated
 *       403:
 *         description: Not comment owner
 */
commentRouter.patch("/:commentId", checkAuth, isCommentOwner, updateComment);

/**
 * @openapi
 * /api/v1/posts/{postId}/comments/{commentId}:
 *   delete:
 *     summary: Delete a comment
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Comment deleted
 *       401:
 *         description: Not authenticated
 *       403:
 *         description: Not comment owner
 */
commentRouter.delete("/:commentId", checkAuth, isCommentOwnerOrAdmin, deleteComment);

/**
 * @openapi
 * /api/v1/posts/{postId}/comments/{commentId}/like:
 *   patch:
 *     summary: Toggle like on a comment
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Like toggled
 *       401:
 *         description: Not authenticated
 */
commentRouter.patch("/:commentId/like", checkAuth, toggleCommentLike)

export default commentRouter
