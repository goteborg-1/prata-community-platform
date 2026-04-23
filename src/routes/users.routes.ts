import express from "express";
import { checkAdmin } from "../middleware/checkAdmin.js";
import { checkAuth } from "../middleware/checkAuth.js";
import { createUser, loginUser, getUserByHandle, getAllUsers, deleteUserById, googleLogin } from "../controllers/users.controller.js";

const usersRouter = express.Router()

//Public routes
usersRouter.post("/google", googleLogin)
usersRouter.post("/register", createUser)
usersRouter.post("/login", loginUser)
usersRouter.get("/:handle", getUserByHandle)

//Admin routes
usersRouter.get("/", checkAuth, checkAdmin, getAllUsers)
usersRouter.delete("/:id", checkAuth, checkAdmin, deleteUserById)

export default usersRouter