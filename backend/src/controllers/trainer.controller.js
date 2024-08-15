import mongoose from "mongoose";
import { Rating } from "../models/rating.model.js";
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

  await Rating.create({
    trainerId: trainer._id,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, trainer, "Trainer added successfully"));
});

export const getAllTrainers = asyncHandler(async (req, res) => {
  const trainers = await Trainer.aggregate([
    {
      $lookup: {
        from: "ratings",
        localField: "_id",
        foreignField: "trainerId",
        as: "ratings",
      },
    },
    {
      $addFields: {
        ratings: {
          $first: "$ratings",
        },
      },
    },
  ]);

  return res.status(200).json(trainers);
});

export const getTrainerById = asyncHandler(async (req, res) => {
  const { trainerId } = req.params;

  const trainer = await Trainer.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(trainerId),
      },
    },
    {
      $lookup: {
        from: "ratings",
        localField: "_id",
        foreignField: "trainerId",
        as: "ratings",
      },
    },
    {
      $addFields: {
        ratings: {
          $first: "$ratings",
        },
      },
    },
  ]);

  if (!trainer) throw new ApiError(400, "Trainer does not exists");

  return res.status(200).json(trainer[0]);
});

export const updateTrainer = asyncHandler(async (req, res) => {
  const { name, email, contact, tech } = req.body;
  let { file: avatar } = req.body;
  console.log(req.body);

  const { trainerId } = req.params;

  if (!avatar) {
    const localFilePath = req.file.path;

    const imageFile = await uploadOnCloudinary(localFilePath);

    if (!imageFile) {
      throw new ApiError(400, "Something went wrong while uploading image");
    }

    avatar = imageFile.url;
  }

  const trainer = await Trainer.findByIdAndUpdate(
    trainerId,
    {
      name,
      email,
      contact,
      tech,
      avatar,
    },
    { new: true }
  );

  return res
    .status(200)
    .json(new ApiResponse(200, trainer, "Trainer updated successfully"));
});

export const updateRating = asyncHandler(async (req, res) => {
  const { trainerId } = req.params;
  const { rating1, rating2, rating3, rating4, rating5 } = req.body;

  const findRating = await Rating.findOne({ trainerId });

  await Rating.findByIdAndUpdate(findRating._id, {
    rating1,
    rating2,
    rating3,
    rating4,
    rating5,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Rating updated successfully"));
});

export const getRating = asyncHandler(async (req, res) => {
  const { trainerId } = req.params;

  const rating = await Rating.findOne({ trainerId });

  return res.status(200).json(rating);
});

export const deleteTrainer = asyncHandler(async (req, res) => {
  const { trainerId } = req.params;

  await Trainer.findByIdAndDelete(trainerId);

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Trainer deleted successfully"));
});
