import express from "express";
import { upload } from "../middlewares/multer.middleware.js";
import {
  addTrainer,
  deleteTrainer,
  getAllTrainers,
  getRating,
  getTrainerById,
  updateRating,
  updateTrainer,
} from "../controllers/trainer.controller.js";

const trainerRouter = express.Router();

trainerRouter.post("/add", upload.single("file"), addTrainer);

trainerRouter.get("/all", getAllTrainers);

trainerRouter.get("/:trainerId", getTrainerById);

trainerRouter.get("/rating/:trainerId", getRating);

trainerRouter.patch("/update/:trainerId", upload.single("file"), updateTrainer);

trainerRouter.patch("/update-rating/:trainerId", updateRating);

trainerRouter.delete("/delete/:trainerId", deleteTrainer);

export default trainerRouter;
