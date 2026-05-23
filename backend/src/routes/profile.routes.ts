import express from "express"
import { getProfile, updateProfile, deleteProfile, getMyPosts, getMyLikedPosts } from "../controllers/profile.controller.js"

const profileRouter = express.Router()

/**
 * @openapi
 * /api/v1/profile:
 *   get:
 *     summary: Get own profile
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Profile returned
 *       401:
 *         description: Not authenticated
 */
profileRouter.get("/", getProfile)

/**
 * @openapi
 * /api/v1/profile:
 *   patch:
 *     summary: Update own profile
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               displayName:
 *                 type: string
 *               avatarColor:
 *                 type: string
 *     responses:
 *       200:
 *         description: Profile updated
 *       401:
 *         description: Not authenticated
 */
profileRouter.patch("/", updateProfile)

/**
 * @openapi
 * /api/v1/profile:
 *   delete:
 *     summary: Delete own account
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Account deleted
 *       401:
 *         description: Not authenticated
 */
profileRouter.delete("/", deleteProfile)

/**
 * @openapi
 * /api/v1/profile/posts:
 *   get:
 *     summary: Get own posts
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Own posts returned
 *       401:
 *         description: Not authenticated
 */
profileRouter.get("/posts", getMyPosts)

/**
 * @openapi
 * /api/v1/profile/likes:
 *   get:
 *     summary: Get own liked posts
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liked posts returned
 *       401:
 *         description: Not authenticated
 */
profileRouter.get("/likes", getMyLikedPosts)

export default profileRouter
