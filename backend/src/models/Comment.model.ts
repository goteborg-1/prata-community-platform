import mongoose, { Schema } from "mongoose"
import type { Comment } from "@prata/shared"

interface IComment extends Omit<Comment, 'userId' | 'username'>, Document {
  userId: mongoose.Types.ObjectId
}

export const commentSchema = new mongoose.Schema<IComment>(
  {
    postId: {
      type: String,
      required: true
    },

    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
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
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        const { _id, __v, likedBy, ...rest } = ret
        const populated = ret.userId
        const isPopulated = populated && typeof populated === 'object' && 'displayName' in populated

        return {
          ...rest,
          id: _id.toString(),
          userId: rest.isAnonymous ? null : (isPopulated ? populated.id : populated?.toString() ?? null),
          username: rest.isAnonymous ? null : (isPopulated ? populated.displayName : null)
        }
      }
    }
  }
)

commentSchema.virtual("likeCount").get(function() {
  return this.likedBy ? this.likedBy.length : 0
})

export const CommentModel = mongoose.model<IComment>("Comment", commentSchema)
