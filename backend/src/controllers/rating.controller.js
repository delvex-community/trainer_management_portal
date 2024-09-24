import { RatingLabel } from "../models/ratingLabel.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getRatingLabels = asyncHandler(async (req, res) => {
  const ratingLabels = await RatingLabel.find();

  return res.status(200).json({ data: ratingLabels?.[0] });
});

export const updateTechRatingLabel = asyncHandler(async (req, res) => {
  const { data } = req.body;

  const findRating = await RatingLabel.find();

  await RatingLabel.findByIdAndUpdate(findRating[0]._id, { tech: data });

  return res.status(200).json({ message: "OK" });
});

export const updateNonTechRatingLabel = asyncHandler(async (req, res) => {
  const { data } = req.body;

  const findRating = await RatingLabel.find();

  await RatingLabel.findByIdAndUpdate(findRating[0]._id, { nonTech: data });

  return res.status(200).json({ message: "OK" });
});
