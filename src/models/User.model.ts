import mongoose, {Schema, Document, Model} from "mongoose";
import { User } from "../types/users.types.js";

export interface IUser extends User, Document {}

const UserSchema = new Schema<IUser>(
  {
    googleId: {
      type: String,
      unique: true,
      sparse: true, //Makes it possible that multiple users can have null
    },
    handle: {
      type: String,
      required: [true, "handle is required"],
      unique: true,
      lowercase: true,
      trim: true,
      minLength: [3, "handle must be at least 3 characters"],
      maxLength: [30, "handle cannot be longer than 30 characters"],
      match: [/^[a-zA-Z0-9_]+$/, "handle can only contain letters, numbers and underscores"]
    },
    displayName: {
      type: String,
      required: [true, "displayName is required"],
      trim: true,
      maxLength: [50,"displayName cannot be longer than 50 characters"],
      default: function(this: IUser) {
        return this.handle
      }
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "please enter a valid email address"]
    },
    password: {
      type: String,
      required: function(this: IUser) {
        return !this.googleId //Only required if not signed in with google
      },
      select: false
    },
    role: {
      type: String,
      enum: ["user", "admin", "psychologist"],
      default: "user"
    },
    createdPosts: {
      type: [Schema.Types.ObjectId],
      ref: "Post",
      default: []
    },
    likedPosts: {
      type: [Schema.Types.ObjectId],
      ref: "Post",
      default: []
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        ret.userId = ret._id.toString()
        delete ret.password
        return ret
      }
    }
  }
)

export const UserModel: Model<IUser> = mongoose.model<IUser>("User", UserSchema)