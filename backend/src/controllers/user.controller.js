import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import bcrypt from "bcryptjs";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

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

export const getAllUsers = asyncHandler(async (req, res) => {
  const { query, sort: sortQuery, order, page } = req.query;
  const limit = 6;

  const skip = (Number(page) - 1) * limit;
  const condition = query
    ? {
        $or: [
          { name: { $regex: query, $options: "i" } },
          { email: { $regex: query, $options: "i" } },
          {
            $expr: {
              $regexMatch: {
                input: { $toString: "$contact" },
                regex: query,
                options: "i",
              },
            },
          },
        ],
      }
    : {};

  const orderValue = order === "desc" ? -1 : 1;

  let sortCondition = {};
  if (sortQuery === "name") {
    sortCondition = { name: orderValue };
  }

  let pipeline = [];

  pipeline.push({
    $match: condition,
  });

  const temp = await User.aggregate(pipeline);

  const length = temp.length;

  pipeline.push(
    {
      $sort: { createdAt: -1 },
    },
    {
      $skip: skip,
    },
    {
      $limit: limit,
    }
  );

  if (sortQuery) {
    pipeline.push({
      $sort: sortCondition,
    });
  }

  const users = await User.aggregate(pipeline);

  return res
    .status(200)
    .json({ data: users, totalPages: Math.ceil(length / limit) });
});

export const deleteUser = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  const findUser = await User.findById(userId);

  if (!findUser) throw new ApiError(404, "User not found");

  await User.findByIdAndDelete(findUser._id);

  return res.status(200).json(new ApiResponse(200, {}, "User deleted"));
});

export const getUserById = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  const findUser = await User.findById(userId);

  if (!findUser) throw new ApiError(404, "user not found");

  return res.status(200).json(findUser);
});

export const updateUser = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  const { name, email, contact } = req.body;
  let { file: avatar } = req.body;

  if (!avatar) {
    const localFilePath = req.file?.path;

    if (localFilePath) {
      const imageFile = await uploadOnCloudinary(localFilePath);

      if (!imageFile) {
        throw new ApiError(400, "Something went wrong while uploading image");
      }

      avatar = imageFile.url;
    } else {
      avatar = "";
    }
  }

  const user = await User.findByIdAndUpdate(
    userId,
    {
      name,
      email,
      contact,
      avatar,
    },
    { new: true }
  );

  return res
    .status(200)
    .json(new ApiResponse(200, user, "updated successfull"));
});
