import mongoose, { Schema } from "mongoose";

const techRatingSchema = new Schema({
  label1: {
    type: String,
    default: "",
  },
  label2: {
    type: String,
    default: "",
  },
  label3: {
    type: String,
    default: "",
  },
  label4: {
    type: String,
    default: "",
  },
  label5: {
    type: String,
    default: "",
  },
});

const nonTechRatingSchema = new Schema({
  label1: {
    type: String,
    default: "",
  },
  label2: {
    type: String,
    default: "",
  },
  label3: {
    type: String,
    default: "",
  },
  label4: {
    type: String,
    default: "",
  },
  label5: {
    type: String,
    default: "",
  },
});

const RatingLabelSchema = new Schema({
  tech: techRatingSchema,
  nonTech: nonTechRatingSchema,
});

export const RatingLabel = mongoose.model("RatingLabel", RatingLabelSchema);
