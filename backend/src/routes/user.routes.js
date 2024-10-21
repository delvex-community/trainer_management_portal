import express from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getCurrentUser,
  getUserById,
  googleLogin,
  googleRegister,
  loginUser,
  logoutUser,
  updateUser,
  updateUserPassword,
} from "../controllers/user.controller.js";
import { verifyUser } from "../middlewares/user.middleware.js";
import { verifyAdmin } from "../middlewares/admin.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const userRouter = express.Router();

userRouter.get("/", verifyUser, getCurrentUser);

userRouter.get("/all", verifyAdmin, getAllUsers);

userRouter.get("/:userId", verifyAdmin, getUserById);

userRouter.post("/create", createUser);

userRouter.post("/google-register", googleRegister);

userRouter.post("/login", loginUser);

userRouter.post("/google-login", googleLogin);

userRouter.post("/logout", verifyUser, logoutUser);

userRouter.patch("/update/:userId", upload.single("file"), updateUser);

userRouter.patch("/update-password/:userId", updateUserPassword);

userRouter.delete("/delete/:userId", deleteUser);
export default userRouter;
