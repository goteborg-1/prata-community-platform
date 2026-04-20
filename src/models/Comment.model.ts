import mongoose from "mongoose"
import type { Comment } from "../types/comments.types.js"

interface IComment extends Comment, Document {}

export const commentSchema = new mongoose.Schema<IComment>({

  postId: {
    type: Number,
    required: true
  },

  userId: {
    type: String,
    required: true
  },

  content: {
    type: String,
    required: true
  },

  isAnonymous: {
    type: Boolean,
    required: true
  },

  likedBy: {
    type: [String],
    default: []
  },

  isPsychologist: {
    type: Boolean,
    default: false
  },

  isEdited: {
    type: Boolean,
    default: false
  }

}, { timestamps: true }) // auto adds timestamps