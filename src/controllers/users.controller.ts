import { Controller } from "../types/index.types.js"
import { UserModel } from "../models/User.model.js"
import { OAuth2Client } from "google-auth-library"
import { createError } from "../utils/createError.js"
import jwt from "jsonwebtoken"

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
  { userId: user._id },
  process.env.JWT_SECRET as string,
  { expiresIn: "7d" }
)

// 5 -- make sure front end gets info back
res.status(200).json({ token, user})

}

export const createUser: Controller = async (req, res) => {

}

export const loginUser: Controller = async (req, res) => {

}

export const getUserBydisplayName: Controller = async (req, res) => {

}

export const getAllUsers: Controller = async (req, res) => {

}

export const deleteUserById: Controller = async (req, res) => {

}