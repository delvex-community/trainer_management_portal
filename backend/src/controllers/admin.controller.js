import { Admin } from "../models/admin.model.js";

async function generateAccessToken(adminId) {
  try {
    const admin = await Admin.findById(adminId);
    const adminToken = admin.generateAdminToken();

    return adminToken;
  } catch (error) {
    throw new ApiError(400, error.message || "Something went wrong.");
  }
}

export const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "Required all the fields");
  }

  const findAdmin = await Admin.findOne({ email });

  if (!findAdmin) {
    throw new ApiError(
      400,
      "Invalid credentials, please check your email and password."
    );
  }

  const isPasswordCorrect = await findAdmin.isPasswordCorrect(password);

  if (!isPasswordCorrect) {
    throw new ApiError(
      400,
      "Invalid credentials, please check your email and password."
    );
  }

  const token = await generateAccessToken(findAdmin._id);

  const loggedInAdmin = await Admin.findById(findAdmin).select("-password");

  const expiryDate = new Date(Date.now() + 15 * 24 * 60 * 60 * 1000);

  const options = {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    path: "/",
    expires: expiryDate,
  };

  return res
    .status(200)
    .cookie("adminToken", token, options)
    .json(new ApiResponse(200, loggedInAdmin, "Logged In"));
});

export const logoutAdmin = asyncHandler(async (req, res) => {
  const expiryDate = new Date(Date.now() + 15 * 24 * 60 * 60 * 1000);

  const options = {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    path: "/",
    expires: expiryDate,
  };

  return res
    .status(200)
    .clearCookie("adminToken", options)
    .json(new ApiResponse(200, {}, "Logged Out"));
});

export const getCurrentAdmin = asyncHandler(async (req, res) => {
  const admin = req.admin;

  return res.status(200).json(admin);
});
