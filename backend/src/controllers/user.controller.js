import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

async function generateAccessToken(userId) {
  try {
    const user = await User.findById(userId);
    const userToken = user.generateUserToken();

    return userToken;
  } catch (error) {
    throw new ApiError(400, error.message || "Something went wrong.");
  }
}

export const createUser = asyncHandler(async (req, res) => {
  const { name, email, contact, password } = req.body;

  if (!name || !email || !contact || !password) {
    throw new ApiError(400, "Required all the fields");
  }

  const findUser = await User.findOne({ email });

  if (findUser) {
    throw new ApiError(400, "User with the email already exists");
  }

  const user = await User.create({
    name,
    email,
    contact,
    password,
  });

  const token = await generateAccessToken(user._id);

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
    .cookie("userToken", token, options)
    .json(new ApiResponse(200, user, "Registered Successfully"));
});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "Required all the fields");
  }

  const findUser = await User.findOne({ email });

  if (!findUser) {
    throw new ApiError(
      400,
      "Invalid credentials, please check your email and password."
    );
  }

  const isPasswordCorrect = await findUser.isPasswordCorrect(password);

  if (!isPasswordCorrect) {
    throw new ApiError(
      400,
      "Invalid credentials, please check your email and password."
    );
  }

  const token = await generateAccessToken(findUser._id);

  const loggedInUser = await User.findById(findUser).select("-password");

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
    .cookie("userToken", token, options)
    .json(new ApiResponse(200, loggedInUser, "Logged In"));
});

export const logoutUser = asyncHandler(async (req, res) => {
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
    .clearCookie("userToken", options)
    .json(new ApiResponse(200, {}, "Logged Out"));
});

export const googleRegister = asyncHandler(async (req, res) => {
  const { name, email, avatar, contact } = req.body;

  console.log(email, name, avatar, contact);

  const findUser = await User.findOne({ email, isGoogle: true });

  if (findUser) {
    throw new ApiError(
      400,
      "You are already registered with the google account"
    );
  }

  const newUser = await User.create({
    name,
    email,
    contact,
    avatar,
    isGoogle: true,
  });

  const token = await generateAccessToken(newUser._id);

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
    .cookie("userToken", token, options)
    .json(new ApiResponse(200, newUser, "Google register successfull"));
});

export const googleLogin = asyncHandler(async (req, res) => {
  const { email } = req.body;

  console.log(req.body);

  const findUser = await User.findOne({ email, isGoogle: true });

  if (!findUser) {
    throw new ApiError(400, "No account exists for this google account");
  }

  const token = await generateAccessToken(findUser._id);

  const expiryDate = new Date(Date.now() + 15 * 24 * 60 * 60 * 1000);

  const options = {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    path: "/",
    expires: expiryDate,
  };

  res
    .status(200)
    .cookie("userToken", token, options)
    .json(new ApiResponse(200, findUser, "Logged In"));
});

export const getCurrentUser = asyncHandler(async (req, res) => {
  const user = req.user;

  return res.status(200).json(user);
});
