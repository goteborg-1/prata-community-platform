import jwt from "jsonwebtoken"
import { OAuth2Client } from "google-auth-library"
import { Controller } from "../types/index.types.js"
import { createError } from "../utils/createError.js"
import { comparePassword, hashPassword } from "../utils/password.js"
import { UserModel } from "../models/User.model.js"
import { PostModel } from "../models/Post.model.js"
import { CommentModel } from "../models/Comment.model.js"
import { createUserBody, getUserParams, getUsersQuery, googleLoginBody, loginUserBody, updateUserRoleParams, userParams } from "@shared"
import { createUserSchema, getUserParamsSchema, getUsersQuerySchema, loginUserSchema, googleLoginSchema, updateUserRoleSchema, UserParamsSchema } from "@shared"

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

export const googleLogin: Controller<{}, googleLoginBody> = async (req, res) => {
  const { idToken } = googleLoginSchema.parse(req.body)

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

    const rawHandle = name?.replace(/\s+/g, "_") ?? email!.split("@")[0] as string

    user = await UserModel.create({
      googleId,
      email: email!,
      handle: rawHandle.toLowerCase().slice(0, 30), //TODO: make sure it still works even if handle is taken, and autogenerates handle until changed by user
      displayName: name || rawHandle // om null, blir den handle
    })
  }

  // 4 -- make own JWT so front end can prove who they are later
  const token = jwt.sign(
    { id: user.id },
    process.env.JWT_SECRET as string,
    { expiresIn: "7d" }
  )

  // 5 -- make sure front end gets info back
  res.status(200).json({
    status: "success",
    data: {
      token, 
      user
    }
  })
}

export const createUser: Controller<{}, createUserBody> = async (req, res) => {
  const validatedData = createUserSchema.parse(req.body)

  const hashedPassword = await hashPassword(validatedData.password)

  const newUser = await UserModel.create({
    ...validatedData,
    password: hashedPassword
  })

  res.status(201).json({
    status: "success",
    data: newUser
  })
}

export const loginUser: Controller<{}, loginUserBody> = async (req, res) => {
  const { email, password } = loginUserSchema.parse(req.body)

  const user = await UserModel.findOne({email}).select("+password")

  if(!user || !user.password) {
    throw createError("Invalid credentials", 401, "INVALID_CREDENTIALS")
  }

  const isMatch = await comparePassword(password, user.password)
  
  if(!isMatch) {
    throw createError("Invalid credentials", 401, "INVALID_CREDENTIALS")
  }

  const token = jwt.sign(
    {id: user.id},
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
  const { handle } = getUserParamsSchema.parse(req.params)

  const user = await UserModel.findOne({handle}).select(["-likedPosts", "-email"])

  if(!user) {
    throw createError("User not found", 404, "USER_NOT_FOUND")
  }

  res.json({
    status: "success",
    data: user
  })
}

export const getAllUsers: Controller<{}, {}, getUsersQuery> = async (req, res) => {
  const { role, search, sort, page, limit } = getUsersQuerySchema.parse(req.query)

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

  const skip = (page - 1) * limit

  const [users, total] = await Promise.all([
    UserModel.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(limit),
    UserModel.countDocuments(query)
  ])

  res.json({
    status: "success",
    data: users,
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit)
    }
  })
}

export const updateUserRole: Controller<userParams, updateUserRoleParams> = async (req, res) => {
  const { id } = UserParamsSchema.parse(req.params)
  const { role } = updateUserRoleSchema.parse(req.body)

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
  const { id } = UserParamsSchema.parse(req.params)
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