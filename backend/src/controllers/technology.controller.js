import { Technology } from "../models/technology.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const addTechnology = asyncHandler(async (req, res) => {
  const { name } = req.body;

  const findTechnology = await Technology.findOne({
    name,
  });

  if (findTechnology) throw new ApiError(400, "Technology already exists");

  const training = await Technology.create({
    name,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, training, "Technology added successfully"));
});

export const getTechnologies = asyncHandler(async (req, res) => {
  const { query, page } = req.query;
  const limit = 12;
  const skip = (Number(page) - 1) * limit;

  const condition = query
    ? {
        name: { $regex: query, $options: "i" },
      }
    : {};

  let pipeline = [];

  pipeline.push({ $match: condition });

  const temp = await Technology.aggregate(pipeline);

  const length = temp.length;

  pipeline.push(
    { $skip: skip },
    {
      $limit: limit,
    }
  );

  const technologies = await Technology.aggregate(pipeline);

  return res
    .status(200)
    .json({ data: technologies, totalPages: Math.ceil(length / limit) });
});

export const updateTechnology = asyncHandler(async (req, res) => {
  const { technologyId } = req.params;
  const { name } = req.body;

  const findTechnology = await Technology.findById(technologyId);

  if (!findTechnology) return new ApiError(400, "Technology doesnt exist");

  const technology = await Technology.findByIdAndUpdate(
    technologyId,
    { name },
    { new: true }
  );

  return res.status(200).json(new ApiResponse(200, technology, "OK"));
});

export const deleteTechnology = asyncHandler(async (req, res) => {
  const { technologyId } = req.params;

  const findTechnology = await Technology.findById(technologyId);

  if (!findTechnology) return new ApiError(400, "Technology doesnt exist");

  const technology = await Technology.findByIdAndDelete(technologyId);

  return res.status(200).json(new ApiResponse(200, technology, "OK"));
});
