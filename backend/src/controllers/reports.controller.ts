import mongoose from "mongoose"
import * as error from "../errors/AppError.js"
import { createReportSchema } from "../../../shared/schema/report/requests.schema.js";
import { Controller } from "../types/index.types.js";
import { ReportModel } from "../models/Report.model.js";

export const createReport: Controller = async (req, res) => {
  const validatedData = createReportSchema.parse(req.body)
  const userId = req.user.id

  if(!userId) throw new error.UnAuthorizedError()

  const newReport = await ReportModel.create({
    ...validatedData,
    reportedBy: userId
  })

  res.status(201).json({
    status: "success",
    data: newReport
  })
}