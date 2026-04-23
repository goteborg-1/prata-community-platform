import { Types } from "mongoose"

export interface User {
  userId: string,
  googleId: string,
  username: string,
  email: string,
  password?: string,
  role: "user" | "admin" | "psychologist",
  createdPosts: Types.ObjectId[],
  likedPosts: Types.ObjectId[],
  createdAt: Date,
  updatedAt: Date
}

export type updateProfileBody = Partial<Pick<User, "username" | "password">> 