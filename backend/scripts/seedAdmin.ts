import mongoose from "mongoose";
import dotenv from "dotenv"
import { hashPassword } from "../src/utils/password.js"
import { UserModel } from "../src/models/User.model.js"

dotenv.config()

//Create initial admin profile
async function seedAdmin() {
  //Connect to MongoDB
  try {
    await mongoose.connect(process.env.MONGODB_URI!)
    console.log("Connected to MongoDB")
  } catch (error) {
    console.error(`Could not connect to MongoDB: ${error}`)
    process.exit(1)
  }

  //Check if admin already exists
  const existingAdmin = await UserModel.findOne({role: "admin"})

  if(existingAdmin) {
    console.log("Admin already exists")
    process.exit(0)
  }

  //Hash password
  const hashedPassword = await hashPassword("admin123")

  //Create admin
  const admin = await UserModel.create({
    email: "admin@example.com",
    handle: "admin",
    role: "admin",
    password: hashedPassword,
  })

  console.log(`Admin created: ${admin.email}`)
  process.exit(0)
}

seedAdmin()