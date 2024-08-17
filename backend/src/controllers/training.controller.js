import mongoose from "mongoose";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Training } from "../models/training.model.js";

export const addTraining = asyncHandler(async (req, res) => {
  const { title, location, mode, trainerId, date } = req.body;

  const findTraining = await Training.findOne({
    $and: [{ title }, { location }, { mode }, { trainerId }, { date }],
  });

  if (findTraining) throw new ApiError(400, "Training already exists");

  const training = await Training.create({
    title,
    location,
    date,
    trainerId,
    mode,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, training, "Training added successfully"));
});

export const getAllTrainings = asyncHandler(async (req, res) => {
  const limit = 6;

  const trainings = await Training.aggregate([
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
  ]);

  const length = trainings.length;

  console.log(trainings);

  return res
    .status(200)
    .json({ data: trainings, totalPages: Math.ceil(length / limit) });
});

export const getTrainerTrainings = asyncHandler(async (req, res) => {
  const { trainerId } = req.params;
  const limit = 6;

  const trainings = await Training.aggregate([
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
    },
  ]);

  const length = trainings.length;

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
  const { title, location, date, trainerId, mode } = req.body;
  const { trainingId } = req.params;

  const findTraining = await Training.findById(trainingId);

  if (!findTraining) throw new ApiError(400, "Training does not exists");

  await Training.findByIdAndUpdate(findTraining._id, {
    title,
    location,
    date,
    mode,
    trainerId,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Training updated successfully"));
});
