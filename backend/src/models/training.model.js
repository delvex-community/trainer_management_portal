import mongoose, { Schema } from "mongoose";

const trainingSchema = new Schema(
  {
    title: {
      type: String,
    },
    location: {
      type: String,
    },
    date: {
      type: Date,
    },
    mode: {
      type: String,
    },
    trainerId: {
      type: Schema.Types.ObjectId,
      ref: "Trainer",
    },
  },
  {
    timestamps: true,
  }
);

export const Training = mongoose.model("Training", trainingSchema);
