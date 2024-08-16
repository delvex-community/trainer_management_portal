import mongoose, { Schema } from "mongoose";

const ratingSchema = new Schema({
  rating1: {
    type: Number,
    default: 1,
  },
  rating2: {
    type: Number,
    default: 1,
  },
  rating3: {
    type: Number,
    default: 1,
  },
  rating4: {
    type: Number,
    default: 1,
  },
  rating5: {
    type: Number,
    default: 1,
  },
  trainerId: {
    type: Schema.Types.ObjectId,
    ref: "Trainer",
  },
});

export const Rating = mongoose.model("Rating", ratingSchema);
