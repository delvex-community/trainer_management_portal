import dotenv from "dotenv";
dotenv.config();

import { v2 as cloudinary } from "cloudinary";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import { connectDB } from "./db/connectDB.js";
import { RatingLabel } from "./models/ratingLabel.model.js";
import adminRouter from "./routes/admin.routes.js";
import ratingRouter from "./routes/rating.routes.js";
import technologyRouter from "./routes/technology.routes.js";
import trainerRouter from "./routes/trainer.routes.js";
import trainingRouter from "./routes/training.routes.js";
import userRouter from "./routes/user.routes.js";

connectDB();

const findLabels = await RatingLabel.find();

if (!findLabels) await RatingLabel.create({ tech: {}, nonTech: {} });

const app = express();
const PORT = 3000;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    exposedHeaders: ["Set-Cookie"],
  })
);

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());

// User API
app.use("/api/user", userRouter);

// Admin API
app.use("/api/admin", adminRouter);

// Trainer API
app.use("/api/trainer", trainerRouter);

// Training API
app.use("/api/training", trainingRouter);

// Technology API
app.use("/api/technology", technologyRouter);

// Rating API
app.use("/api/rating", ratingRouter);

app.get("/", (req, res) => {
  res.send("Server is Running");
});

app.listen(PORT, () => {
  console.log(`Server is Listening on port ${PORT}`);
});
