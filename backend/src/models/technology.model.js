import mongoose, { Schema } from "mongoose";

const technologySchema = new Schema(
  {
    name: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const Technology = mongoose.model("Technology", technologySchema);
