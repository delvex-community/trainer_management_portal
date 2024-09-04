import mongoose, { Schema } from "mongoose";

const techRatingSchema = new Schema({
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
});

const nonTechRatingSchema = new Schema({
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
});

const RatingSchema = new Schema({
  tech: techRatingSchema,
  nonTech: nonTechRatingSchema,
  trainerId: {
    type: Schema.Types.ObjectId,
    ref: "Trainer",
  },
});

export const Rating = mongoose.model("Rating", RatingSchema);
