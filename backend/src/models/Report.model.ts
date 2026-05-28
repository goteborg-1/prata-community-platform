import mongoose, {Schema, Document, Model} from "mongoose";
import { REPORT_OPTIONS, STATUS_OPTIONS, type Report } from "@prata/shared";

interface IReport extends Omit<Report, "postId" | "reportedBy">, Document {
  postId: Schema.Types.ObjectId |string,
  reportedBy: Schema.Types.ObjectId | string,
}

const ReportSchema = new Schema<IReport>(
  {
    postId: {
      type: Schema.Types.ObjectId,
      ref: "Post",
      index: true,
      required: true
    },
    commentId: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    reportedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    reason: {
      type: String,
      enum: REPORT_OPTIONS,
      required: true
    },
    comment: {
      type: String,
      maxLength: 500
    },
    status: {
      type: String,
      enum: STATUS_OPTIONS,
      default: "pending"
    }
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        const { _id, __v, ...rest } = ret

        return {
          ...rest,
          id: _id.toString()
        }
      }
    }
  }
)

export const ReportModel: Model<IReport> = mongoose.model<IReport>("Report", ReportSchema)