import express from "express"
import { checkAuth } from "../middleware/checkAuth.js"
import { isPostOwner } from "../middleware/isOwner.js"
import { getAllPosts, getPostById, createPost, updatePost, toggleLike, deletePost } from "../controllers/posts.controller.js"
import { optionalAuth } from "../middleware/optionalAuth.js"

const postsRouter = express.Router()

/**
 * @openapi
 * /api/v1/posts:
 *   get:
 *     summary: Get all posts
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: List of posts returned successfully
 */
postsRouter.get("/", optionalAuth, getAllPosts)

/**
 * @openapi
 * /api/v1/posts/{id}:
 *   get:
 *     summary: Get post by ID
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Post returned successfully
 *       404:
 *         description: Post not found
 */
postsRouter.get("/:id", optionalAuth, getPostById)

/**
 * @openapi
 * /api/v1/posts:
 *   post:
 *     summary: Create a post
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               categories:
 *                 type: array
 *                 items:
 *                   type: string
 *               isAnonymous:
 *                 type: boolean
 *               triggerTags:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Post created
 *       401:
 *         description: Not authenticated
 */
postsRouter.post("/", checkAuth, createPost)

/**
 * @openapi
 * /api/v1/posts/{id}:
 *   patch:
 *     summary: Update a post
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Post updated
 *       401:
 *         description: Not authenticated
 *       403:
 *         description: Not post owner
 */
postsRouter.patch("/:id", checkAuth, isPostOwner, updatePost)

/**
 * @openapi
 * /api/v1/posts/{id}/like:
 *   patch:
 *     summary: Toggle like on a post
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Like toggled
 *       401:
 *         description: Not authenticated
 */
postsRouter.patch("/:id/like", checkAuth, toggleLike)

/**
 * @openapi
 * /api/v1/posts/{id}:
 *   delete:
 *     summary: Delete a post
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Post deleted
 *       401:
 *         description: Not authenticated
 *       403:
 *         description: Not post owner
 */
postsRouter.delete("/:id", checkAuth, isPostOwner, deletePost)

export default postsRouter
