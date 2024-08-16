import mongoose from "mongoose";

export const connectDB = () => {
  try {
    mongoose
      .connect(process.env.DATABASE_URI)
      .then(() => console.log("Database Connected"));
  } catch (error) {
    console.log(error);
  }
};
