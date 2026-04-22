import mongoose, {Schema, Document, Model} from "mongoose";
import { User } from "../types/users.types.js";

interface IUser extends User, Document {}

const UserSchema = new Schema<IUser>(
  {
    googleId: {
      type: String,
      unique: true,
      sparse: true, //Makes it possible that multiple users can have null
    },
    username: {
      type: String,
      required: [true, "username is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"]
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
      type: [String],
      ref: "Post"
    },
    likedPosts: {
      type: [String],
      ref: "Post"
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