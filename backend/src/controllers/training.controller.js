import mongoose from "mongoose";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Training } from "../models/training.model.js";

export const addTraining = asyncHandler(async (req, res) => {
  const { title, location, mode, trainerId, startDate, endDate } = req.body;

  if (!title || !location || !mode || !trainerId || !startDate || !endDate) {
    throw new ApiError(400, "Required all the fields");
  }

  const findTraining = await Training.findOne({
    $and: [
      { title },
      { location },
      { mode },
      { trainerId },
      { startDate },
      { endDate },
    ],
  });

  if (findTraining) throw new ApiError(400, "Training already exists");

  const training = await Training.create({
    title,
    location,
    startDate,
    endDate,
    trainerId,
    mode,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, training, "Training added successfully"));
});

export const getAllTrainings = asyncHandler(async (req, res) => {
  const { query, page } = req.query;
  const limit = 6;
  const skip = (Number(page) - 1) * limit;

  const condition = query
    ? {
        $or: [
          { title: { $regex: query, $options: "i" } },
          { location: { $regex: query, $options: "i" } },
          { mode: { $regex: query, $options: "i" } },
        ],
      }
    : {};

  let pipeline = [];

  pipeline.push(
    {
      $lookup: {
        from: "trainers",
        localField: "trainerId",
        foreignField: "_id",
        as: "trainer",
      },
    },
    {
      $addFields: {
        trainer: {
          $first: "$trainer",
        },
      },
    },
    {
      $match: condition,
    }
  );

  const temp = await Training.aggregate(pipeline);

  const length = temp.length;

  pipeline.push(
    {
      $sort: { createdAt: -1 },
    },
    {
      $skip: skip,
    },
    { $limit: limit }
  );

  const trainings = await Training.aggregate(pipeline);
  return res
    .status(200)
    .json({ data: trainings, totalPages: Math.ceil(length / limit) });
});

export const getTrainerTrainings = asyncHandler(async (req, res) => {
  const { trainerId } = req.params;
  const limit = 3;
  const { page } = req.query;
  const skip = (Number(page) - 1) * limit;

  let pipeline = [];

  pipeline.push(
    {
      $match: {
        trainerId: new mongoose.Types.ObjectId(trainerId),
      },
    },
    {
      $lookup: {
        from: "trainers",
        localField: "trainerId",
        foreignField: "_id",
        as: "trainer",
      },
    },
    {
      $addFields: {
        trainer: {
          $first: "$trainer",
        },
      },
    }
  );

  const temp = await Training.aggregate(pipeline);

  const length = temp.length;

  pipeline.push(
    {
      $sort: { createdAt: -1 },
    },
    {
      $skip: skip,
    },
    { $limit: limit }
  );
  const trainings = await Training.aggregate(pipeline);

  return res
    .status(200)
    .json({ data: trainings, totalPages: Math.ceil(length / limit) });
});

export const deleteTraining = asyncHandler(async (req, res) => {
  const { trainingId } = req.params;

  await Training.findByIdAndDelete(trainingId);

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Training deleted successfully"));
});

export const getTrainingById = asyncHandler(async (req, res) => {
  const { trainingId } = req.params;

  const training = await Training.findById(trainingId);

  if (!training) throw new ApiError(400, "Training does not exists");

  return res.status(200).json(training);
});

export const updateTraining = asyncHandler(async (req, res) => {
  const { title, location, startDate, endDate, trainerId, mode } = req.body;
  const { trainingId } = req.params;

  const findTraining = await Training.findById(trainingId);

  if (!findTraining) throw new ApiError(400, "Training does not exists");

  await Training.findByIdAndUpdate(findTraining._id, {
    title,
    location,
    startDate,
    endDate,
    mode,
    trainerId,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Training updated successfully"));
});
