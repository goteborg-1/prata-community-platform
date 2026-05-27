import mongoose, {Schema, Document, Model} from "mongoose";
import { AVATAR_COLORS, type User } from "@prata/shared";

export interface IUser extends User, Document {
  deletedAt: Date | null
}

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
      minLength: [8, "Password must be at least 8 characters"],
      match: [/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^\s]+$/, "Password must include at least one capital, lowercase and number"]
    },
    role: {
      type: String,
      enum: ["user", "admin", "psychologist"],
      default: "user"
    },
    avatarColor: {
      type: String,
      enum: AVATAR_COLORS,
      default: "#84A59D"
    },
    deletedAt: {
      type: Date,
      default: null
    }
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        const { _id, __v, password, deletedAt, ...rest} = ret // remove fields front end shall not see and only send whats left (...rest)

        return {
          ...rest,
          id: _id.toString(),
        }
      }
    }
  }
)

export const UserModel: Model<IUser> = mongoose.model<IUser>("User", UserSchema)