import mongoose from "mongoose"
import type { Comment } from "../types/comments.types.js"

interface IComment extends Comment, Document {}

export const commentSchema = new mongoose.Schema<IComment>(
  {
    postId: {
      type: String,
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
      default: false
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
  },
  {
    timestamps: true, // auto adds timestamps
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        delete ret.likedBy
        if(ret.isAnonymous) {
          ret.userId = null
        }
        return ret
      }
    }
  }
)

commentSchema.virtual("likeCount").get(function() {
  return this.likedBy ? this.likedBy.length : 0
})

export const CommentModel = mongoose.model<IComment>("Comment", commentSchema)