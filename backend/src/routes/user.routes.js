import express from "express";
import {
  createUser,
  getCurrentUser,
  googleLogin,
  googleRegister,
  loginUser,
  logoutUser,
} from "../controllers/user.controller.js";
import { verifyUser } from "../middlewares/user.middleware.js";

const userRouter = express.Router();

userRouter.get("/", verifyUser, getCurrentUser);

userRouter.post("/create", createUser);

userRouter.post("/google-register", googleRegister);

userRouter.post("/login", loginUser);

userRouter.post("/google-login", googleLogin);

userRouter.post("/logout", verifyUser, logoutUser);

export default userRouter;
