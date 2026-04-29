import mongoose, {Schema, Document, Model} from "mongoose";
import type { User } from "@shared";

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
      required: [true, "Handle is required"],
      unique: true,
      lowercase: true,
      trim: true,
      minLength: [3, "Handle must be at least 3 characters"],
      maxLength: [30, "Handle cannot be longer than 30 characters"],
      match: [/^[a-zA-Z0-9_]+$/, "Handle can only contain letters, numbers and underscores"]
    },
    displayName: {
      type: String,
      required: [true, "DisplayName is required"],
      trim: true,
      maxLength: [50,"DisplayName cannot be longer than 50 characters"],
      default: function(this: IUser) {
        return this.handle
      }
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email address"]
    },
    password: {
      type: String,
      required: function(this: IUser) {
        return !this.googleId //Only required if not signed in with google
      },
      select: false,
      minLength: [8, "Password must be at least 8 characters"],
      match: [/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^\s]+$/, "Password must include at least one capital, lowercase and number"]
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
      virtuals: true,
      transform: (doc, ret) => {
        delete ret.password
        return ret
      }
    }
  }
)

UserSchema.virtual("userId").get(function (this: IUser) {
  return this._id.toHexString()
})

export const UserModel: Model<IUser> = mongoose.model<IUser>("User", UserSchema)