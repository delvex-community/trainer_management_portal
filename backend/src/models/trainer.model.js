import mongoose, { Schema } from "mongoose";

const trainerSchema = new Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    avatar: {
      type: String,
    },
    contact: {
      type: Number,
    },
    tech: {
      type: String,
    },
    location: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const Trainer = mongoose.model("Trainer", trainerSchema);
