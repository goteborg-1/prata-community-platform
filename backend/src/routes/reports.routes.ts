import express from "express";
import { checkAuth } from "../middleware/checkAuth.js";
import { createReport } from "../controllers/reports.controller.js";

const reportsRouter = express.Router()

/**
 * @openapi
 * /api/v1/reports:
 *   post:
 *     summary: Create a report
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               postId:
 *                 type: string
 *               commentId:
 *                 type: string
 *               reason:
 *                 type: string
 *                 enum: [spam, hateSpeech, harassment, inappropriate, misinformation, other]
 *               comment:
 *                 type: string
 *     responses:
 *       201:
 *         description: Report created
 *       401:
 *         description: Not authenticated
 */
reportsRouter.post("/", checkAuth, createReport)

export default reportsRouter