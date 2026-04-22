export interface User {
  userId: string,
  googleId: string,
  username: string,
  email: string,
  password?: string,
  createdPosts: string[],
  likedPosts: string[],
  createdAt: Date,
  updatedAt: Date
}