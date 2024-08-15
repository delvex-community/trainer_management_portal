import express from "express";
import {
  getCurrentAdmin,
  loginAdmin,
  logoutAdmin,
} from "../controllers/admin.controller.js";
import { verifyAdmin } from "../middlewares/admin.middleware.js";

const adminRouter = express.Router();

adminRouter.get("/", verifyAdmin, getCurrentAdmin);

adminRouter.post("/login", loginAdmin);

adminRouter.post("/logout", verifyAdmin, logoutAdmin);

export default adminRouter;
