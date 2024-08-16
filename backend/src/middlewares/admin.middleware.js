import { Admin } from "../models/admin.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

export const verifyAdmin = asyncHandler(async (req, res, next) => {
  const token =
    req.cookies?.adminToken ||
    req.header("Authorization")?.replace("Bearer", "");

  if (!token) throw new ApiError(401, "Unauthorized Request");

  const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

  const admin = await Admin.findById(decodedToken._id);

  if (!admin) {
    throw new ApiError(401, "Unauthorized Request");
  }

  req.admin = admin;

  next();
});
