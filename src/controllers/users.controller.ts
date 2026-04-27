import jwt from "jsonwebtoken"
import { OAuth2Client } from "google-auth-library"
import { Controller } from "../types/index.types.js"
import { createError } from "../utils/createError.js"
import { comparePassword, hashPassword } from "../utils/password.js"
import { UserModel } from "../models/User.model.js"
import { PostModel } from "../models/Post.model.js"
import { CommentModel } from "../models/Comment.model.js"
import { createUserBody, getUserParams, getUsersQuery, loginUserBody, updateUserRoleParams, userParams } from "../types/users.types.js"

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

export const googleLogin: Controller = async (req, res) => {
  const { idToken } = req.body as { idToken: string }

if (!idToken) {
  throw createError("No token provided", 400, "NO_TOKEN_PROVIDED")
}

// 1 -- ask google if its a valid token
const ticket = await googleClient.verifyIdToken({
  idToken,
  audience: process.env.GOOGLE_CLIENT_ID as string,
})

// 2 -- exract info from google
const payload = ticket.getPayload()
if (!payload) {
  throw createError("Invalid Google token", 400, "INVALID_GOOGLE_TOKEN")
}

// only grab the tasty bits
const { sub: googleId, email, name } = payload


// 3 -- avoid duplicate user
let user = await UserModel.findOne({ googleId })


if (!user) {

  user = await UserModel.create({
    googleId,
    email: email!,
    handle: name?.replace(/\s+/g, "_") ?? email!.split("@")[0] as string, //TODO: make sure it still works even if handle is taken, and autogenerates handle until changed by user
    displayName: name || "" // om null, blir den handle
  })
}

// 4 -- make own JWT so front end can prove who they are later
const token = jwt.sign(
  { userId: user.userId },
  process.env.JWT_SECRET as string,
  { expiresIn: "7d" }
)

// 5 -- make sure front end gets info back
res.status(200).json({ token, user})

}

export const createUser: Controller<{}, createUserBody> = async (req, res) => {
  const {email, handle, displayName, password} = req.body

  if (!email || !handle || !password) {
    throw createError("Email, handle and password are required", 400, "MISSING_FIELDS")
  }

  const hashedPassword = await hashPassword(password)

  const newUser = await UserModel.create({
    email,
    handle,
    displayName,
    password: hashedPassword
  })

  res.status(201).json({
    status: "success",
    data: newUser
  })
}

export const loginUser: Controller<{}, loginUserBody> = async (req, res) => {
  const {email, password} = req.body
  
  if(!email || !password) {
    throw createError("Email and password are required", 400, "MISSING_FIELDS")
  }

  const user = await UserModel.findOne({email}).select("+password")

  if(!user || !user.password) {
    throw createError("Invalid credentials", 401, "INVALID_CREDENTIALS")
  }

  const isMatch = await comparePassword(password, user.password)
  
  if(!isMatch) {
    throw createError("Invalid credentials", 401, "INVALID_CREDENTIALS")
  }

  const token = jwt.sign(
    {userId: user.userId},
    process.env.JWT_SECRET!,
    {expiresIn: "7d"}
  )

  res.json({
    status: "success",
    data: {
      token,
      user
    }
  })
}

export const getUserByHandle: Controller<getUserParams> = async (req, res) => {
  const handle = req.params.handle

  const user = await UserModel.findOne({handle})

  if(!user) {
    throw createError("User not found", 404, "USER_NOT_FOUND")
  }

  res.json({
    status: "success",
    data: user
  })
}

export const getAllUsers: Controller<{}, {}, getUsersQuery> = async (req, res) => {
  const { role, search, sort, page, limit } = req.query

  const query: Record<string, unknown> = {}

  //Filtering
  if(role) query.role = role

  //Search
  if(search) {
    query.$or = [
      {displayName: {$regex: search, $options: "i"}},
      {handle: {$regex: search, $options: "i"}}
    ]
  }

  //Sort
  let sortOptions: Record<string, 1 | -1> = {createdAt: -1} //Default, newest first
  if(sort === "name") {
    sortOptions = {displayName: 1}
  }

  const pageNum = Number(page) || 1
  const limitNum = Number(limit) || 5
  const skip = (pageNum - 1) * limitNum

  const [users, total] = await Promise.all([
    UserModel.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(limitNum),
    UserModel.countDocuments(query)
  ])

  res.json({
    status: "success",
    data: users,
    meta: {
      page: pageNum,
      limit: limitNum,
      total,
      totalPages: Math.ceil(total / limitNum)
    }
  })
}

export const updateUserRole: Controller<userParams, updateUserRoleParams> = async (req, res) => {
  const id = req.params.id
  const role = req.body.role.toLowerCase()

  const allowedRoles = ["user", "admin", "psychologist"]
  
  if(!role) {
    throw createError("No role provided", 400, "NO_UPDATE_FIELDS")
  }

  if(!allowedRoles.includes(role)) {
    throw createError("Invalid role", 400, "INVALID_ROLE")
  }

  const updatedUser = await UserModel.findByIdAndUpdate(
    id,
    {role},
    {
      new: true,
      runValidators: true
    }
  ).select("-password")

  if(!updatedUser) {
    throw createError("User no longer exists", 404, "USER_NOT_FOUND")
  }

  res.json({
    status: "success",
    data: updatedUser
  })
}

export const deleteUserById: Controller<userParams> = async (req, res) => {
  const id = req.params.id
  const user = await UserModel.findById(id)

  if(!user) {
    throw createError("User not found", 404, "USER_NOT_FOUND")
  }

  await PostModel.deleteMany({userId: id})
  await CommentModel.deleteMany({userId: id})
  await PostModel.updateMany(
    {likedBy: id},
    {$pull: {likedBy: id}}
  )
  await UserModel.findByIdAndDelete(id)
  
  res.status(204).send()
}