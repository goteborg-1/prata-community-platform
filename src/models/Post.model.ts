import mongoose, {Schema, Document, Model} from "mongoose";
import type { Post } from "../types/posts.types.js";

interface IPost extends Post, Document {}

const PostSchema = new Schema<IPost>(
  {
    customId: {
      type: Number,
      unique: true,
    },
    userId: {
      type: String,
      required: [true, "userId is required"],
    },
    isAnonymous: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [200, "Title cannot be longer than 200 characters"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    categories: {
      type: [String],
      required: [true, "Category is required"],
      enum: ["relationships", "family", "parenting", "stress", "anxiety", "loneliness", "grief-and-loss", "depression", "other"],
    },
    triggerTags: {
      type: [String],
      enum: ["self-harm", "suicidal-thoughts", "substance-abuse", "gambling", "eating-disorders", "body-image", "abuse", "domestic-violence", "trauma"],
      default: [],
    },
    likedBy: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true
  }
)

export const PostModel: Model<IPost> = mongoose.model<IPost>("Post", PostSchema)