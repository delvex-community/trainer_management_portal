import mongoose from "mongoose";
import { RatingLabel } from "../models/ratingLabel.model.js";

export const connectDB = () => {
  try {
    mongoose.connect(process.env.DATABASE_URI).then(() => {
      console.log("Database Connected");
      createLabels();
    });
  } catch (error) {
    console.log(error);
  }
};

async function createLabels() {
  const findLabels = await RatingLabel.find();

  if (!findLabels[0]) await RatingLabel.create({ tech: {}, nonTech: {} });
}
