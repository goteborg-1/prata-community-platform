import express from "express";
import { checkAdmin } from "../middleware/checkAdmin.js";
import { checkAuth } from "../middleware/checkAuth.js";
import { createUser, loginUser, getUserByHandle, getAllUsers, updateUserRole, deleteUserById, googleLogin } from "../controllers/users.controller.js";

const usersRouter = express.Router()

//Public routes
usersRouter.post("/google", googleLogin)
usersRouter.post("/register", createUser)
usersRouter.post("/login", loginUser)

//Admin routes
usersRouter.get("/", checkAuth, checkAdmin, getAllUsers)
usersRouter.patch("/:id", checkAuth, checkAdmin, updateUserRole)
usersRouter.delete("/:id", checkAuth, checkAdmin, deleteUserById)

//Public get user by handle
usersRouter.get("/:handle", getUserByHandle)

export default usersRouter