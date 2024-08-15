import express from "express";
import { upload } from "../middlewares/multer.middleware.js";
import {
  addTrainer,
  getAllTrainers,
} from "../controllers/trainer.controller.js";

const trainerRouter = express.Router();

trainerRouter.post("/add", upload.single("file"), addTrainer);

trainerRouter.get("/all", getAllTrainers);

export default trainerRouter;
