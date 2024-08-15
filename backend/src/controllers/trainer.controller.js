import { Trainer } from "../models/trainer.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

export const addTrainer = asyncHandler(async (req, res) => {
  const { name, email, contact, tech } = req.body;

  const findTrainer = await Trainer.findOne({ $or: [{ email, contact }] });

  if (findTrainer)
    throw new ApiError(
      400,
      "Trainer with this email or contact already exists."
    );

  let avatarUrl = req.file?.path;

  if (!avatarUrl) throw new ApiError(400, "Avatar file is required");

  const localFilePath = req.file.path;

  const imageFile = await uploadOnCloudinary(localFilePath);

  if (!imageFile)
    throw new ApiError(400, "Something went wrong while uploading avatar");

  avatarUrl = imageFile.url;

  const trainer = await Trainer.create({
    name,
    email,
    contact,
    tech,
    avatar: avatarUrl,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, trainer, "Trainer added successfully"));
});

export const getAllTrainers = asyncHandler(async (req, res) => {
  const trainers = await Trainer.find();

  return res.status(200).json(trainers);
});
