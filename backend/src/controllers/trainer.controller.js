import mongoose from "mongoose";
import { Rating } from "../models/rating.model.js";
import { Trainer } from "../models/trainer.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

export const addTrainer = asyncHandler(async (req, res) => {
  const { name, email, contact, tech, location } = req.body;

  const findTrainer = await Trainer.findOne({ $or: [{ email, contact }] });

  if (findTrainer)
    throw new ApiError(
      400,
      "Trainer with this email or contact already exists."
    );

  let avatarUrl = req.file?.path || "";

  if (avatarUrl) {
    const localFilePath = req.file.path;

    const imageFile = await uploadOnCloudinary(localFilePath);

    if (!imageFile)
      throw new ApiError(400, "Something went wrong while uploading avatar");

    avatarUrl = imageFile.url;
  }

  const trainer = await Trainer.create({
    name,
    email,
    contact,
    tech,
    avatar: avatarUrl,
    location,
  });

  await Rating.create({
    trainerId: trainer._id,
    tech: {},
    nonTech: {},
  });

  return res
    .status(200)
    .json(new ApiResponse(200, trainer, "Trainer added successfully"));
});

export const getAllTrainers = asyncHandler(async (req, res) => {
  const { query, sort: sortQuery, order, page } = req.query;
  const limit = 6;

  const skip = (Number(page) - 1) * limit;
  const condition = query
    ? {
        $or: [
          { name: { $regex: query, $options: "i" } },
          { email: { $regex: query, $options: "i" } },
          { tech: { $regex: query, $options: "i" } },
          { location: { $regex: query, $options: "i" } },
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
  if (sortQuery === "rating") {
    sortCondition = { avgRating: orderValue };
  }

  let pipeline = [];

  pipeline.push({
    $lookup: {
      from: "ratings",
      localField: "_id",
      foreignField: "trainerId",
      as: "ratings",
    },
  });

  pipeline.push(
    {
      $addFields: {
        ratings: {
          $first: "$ratings",
        },
      },
    },
    {
      $addFields: {
        avgRating: {
          $avg: [
            "$ratings.tech.rating1",
            "$ratings.tech.rating2",
            "$ratings.tech.rating3",
            "$ratings.tech.rating4",
            "$ratings.tech.rating5",
            "$ratings.nonTech.rating1",
            "$ratings.nonTech.rating2",
            "$ratings.nonTech.rating3",
            "$ratings.nonTech.rating4",
            "$ratings.nonTech.rating5",
          ],
        },
      },
    },
    {
      $match: condition,
    },
    {
      $skip: skip,
    }
  );

  const temp = await Trainer.aggregate(pipeline);

  const length = temp.length;

  pipeline.push({
    $limit: limit,
  });

  if (sortQuery) {
    pipeline.push({
      $sort: sortCondition,
    });
  }
  const trainers = await Trainer.aggregate(pipeline);

  return res
    .status(200)
    .json({ data: trainers, totalPages: Math.ceil(length / limit) });
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
    {
      $addFields: {
        avgRating: {
          $avg: [
            "$ratings.tech.rating1",
            "$ratings.tech.rating2",
            "$ratings.tech.rating3",
            "$ratings.tech.rating4",
            "$ratings.tech.rating5",
            "$ratings.nonTech.rating1",
            "$ratings.nonTech.rating2",
            "$ratings.nonTech.rating3",
            "$ratings.nonTech.rating4",
            "$ratings.nonTech.rating5",
          ],
        },
      },
    },
    {
      $lookup: {
        from: "trainings",
        localField: "_id",
        foreignField: "trainerId",
        as: "trainingCount",
      },
    },
    {
      $addFields: {
        trainingCount: {
          $size: "$trainingCount",
        },
      },
    },
  ]);

  if (!trainer) throw new ApiError(400, "Trainer does not exists");

  return res.status(200).json(trainer[0]);
});

export const updateTrainer = asyncHandler(async (req, res) => {
  const { name, email, contact, tech, location } = req.body;
  let { file: avatar } = req.body;

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
      location,
    },
    { new: true }
  );

  return res
    .status(200)
    .json(new ApiResponse(200, trainer, "Trainer updated successfully"));
});

export const updateTechRating = asyncHandler(async (req, res) => {
  const { trainerId } = req.params;
  const { rating1, rating2, rating3, rating4, rating5 } = req.body;

  const findRating = await Rating.findOne({ trainerId });

  await Rating.findByIdAndUpdate(findRating._id, {
    tech: { rating1, rating2, rating3, rating4, rating5 },
  });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Tech Rating updated successfully"));
});

export const updateNonTechRating = asyncHandler(async (req, res) => {
  const { trainerId } = req.params;
  const { rating1, rating2, rating3, rating4, rating5 } = req.body;

  const findRating = await Rating.findOne({ trainerId });

  await Rating.findByIdAndUpdate(findRating._id, {
    nonTech: { rating1, rating2, rating3, rating4, rating5 },
  });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Non Tech Rating updated successfully"));
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
