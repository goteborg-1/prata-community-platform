import express from "express";
import { checkAdmin } from "../middleware/checkAdmin.js";
import { checkAuth } from "../middleware/checkAuth.js";
import { createUser, loginUser, getUserByHandle, getAllUsers, updateUserRole, deleteUserById, googleLogin } from "../controllers/users.controller.js";

const usersRouter = express.Router()

/**
 * @openapi
 * /api/v1/users/google:
 *   post:
 *     summary: Login or register with Google
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *     responses:
 *       200:
 *         description: Logged in with Google, returns JWT token
 */
usersRouter.post("/google", googleLogin)

/**
 * @openapi
 * /api/v1/users/register:
 *   post:
 *     summary: Register new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [handle, email, password]
 *             properties:
 *               handle:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               displayName:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created
 *       400:
 *         description: Validation error
 */
usersRouter.post("/register", createUser)

/**
 * @openapi
 * /api/v1/users/login:
 *   post:
 *     summary: Login
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful, returns JWT token
 *       401:
 *         description: Invalid credentials
 */
usersRouter.post("/login", loginUser)

/**
 * @openapi
 * /api/v1/users:
 *   get:
 *     summary: Get all users (admin only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all users
 *       401:
 *         description: Not authenticated
 *       403:
 *         description: Not admin
 */
usersRouter.get("/", checkAuth, checkAdmin, getAllUsers)

/**
 * @openapi
 * /api/v1/users/{id}:
 *   patch:
 *     summary: Update user role (admin only)
 *     tags: [Users]
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
 *               role:
 *                 type: string
 *                 enum: [user, admin, psychologist]
 *     responses:
 *       200:
 *         description: Role updated
 *       401:
 *         description: Not authenticated
 *       403:
 *         description: Not admin
 */
usersRouter.patch("/:id", checkAuth, checkAdmin, updateUserRole)

/**
 * @openapi
 * /api/v1/users/{id}:
 *   delete:
 *     summary: Delete user (admin only)
 *     tags: [Users]
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
 *         description: User deleted
 *       401:
 *         description: Not authenticated
 *       403:
 *         description: Not admin
 */
usersRouter.delete("/:id", checkAuth, checkAdmin, deleteUserById)

/**
 * @openapi
 * /api/v1/users/{handle}:
 *   get:
 *     summary: Get user by handle
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: handle
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User returned
 *       404:
 *         description: User not found
 */
usersRouter.get("/:handle", getUserByHandle)

export default usersRouter
