import express from "express";
import {
  addTraining,
  deleteTraining,
  getAllTrainings,
  getTrainerTrainings,
} from "../controllers/training.controller.js";

const trainingRouter = express.Router();

trainingRouter.get("/all", getAllTrainings);

trainingRouter.get("/:trainerId", getTrainerTrainings);

trainingRouter.post("/add", addTraining);

trainingRouter.delete("/:trainingId", deleteTraining);

export default trainingRouter;
