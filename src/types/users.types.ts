export interface User {
  userId: string,
  googleId: string,
  username: string,
  email: string,
  password?: string,
  role: "user" | "admin" | "psychologist",
  createdPosts: string[],
  likedPosts: string[],
  createdAt: Date,
  updatedAt: Date
}