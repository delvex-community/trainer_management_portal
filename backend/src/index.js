import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { connectDB } from "./db/connectDB.js";
import { v2 as cloudinary } from "cloudinary";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.routes.js";
import adminRouter from "./routes/admin.routes.js";
import trainerRouter from "./routes/trainer.routes.js";

connectDB();

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

app.get("/", (req, res) => {
  res.send("Server is Running");
});

app.listen(PORT, () => {
  console.log(`Server is Listening on port ${PORT}`);
});
