import express from "express";
import { createReport } from "../controllers/reports.controller.js";

const reportsRouter = express.Router()

reportsRouter.post("/", createReport)

export default reportsRouter