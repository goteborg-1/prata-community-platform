import { Types } from "mongoose"

type Role = "user" | "admin" | "psychologist"

export interface User {
  id: string,
  googleId: string,
  handle: string,
  displayName: string,
  email: string,
  password?: string,
  role: Role,
  createdPosts: string[],
  likedPosts: string[],
  createdAt: string,
  updatedAt: string
}

export type updateProfileBody = Partial<Pick<User, "displayName" | "password">> 

export type createUserBody = Pick<User, "handle" | "displayName" | "email" | "password">

export type loginUserBody = Pick<User, "email" | "password">

export type getUserParams = Pick<User, "handle">

export type getUsersQuery = {
  role?: Role
  search?: string
  sort?: "name" | "newest"
  page?: string
  limit?: string
}

export type updateUserRoleParams = Pick<User, "role">

export type userParams = {id: string}