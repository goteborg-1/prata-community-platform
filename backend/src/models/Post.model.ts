import mongoose, {Schema, Document, Model} from "mongoose";
import type { Post } from "@prata/shared";

interface IPost extends Post, Document {
  deletedAt: Date | null
}

const PostSchema = new Schema<IPost>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "userId is required"],
      index: true
    },
    isAnonymous: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      minLength: [3, "Title cannot be shorter than 3 characters"],
      maxlength: [100, "Title cannot be longer than 100 characters"],
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
    likedBy: [{
      type: Schema.Types.ObjectId,
      ref: "User",
      index: true
    }],
    commentCount: {
      type: Number,
      default: 0
    },
    deletedAt: {
      type: Date,
      default: null
    }
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true, //So we can add likeCount after likedBy is updated
      transform: (doc, ret) => {
        const { _id, __v, likedBy, deletedAt, ...rest} = ret // remove fields front end shall not see and only send whats left (...rest)

        return {
          ...rest,
          id: _id.toString(),
          userId: rest.isAnonymous ? null : rest.userId
        }
      }
    }
  }
)

PostSchema.virtual("likeCount").get(function() {
  return this.likedBy ? this.likedBy.length : 0
})

export const PostModel: Model<IPost> = mongoose.model<IPost>("Post", PostSchema)