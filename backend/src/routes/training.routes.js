import express from "express";
import {
  addTraining,
  deleteTraining,
  getAllTrainings,
  getTrainerTrainings,
  getTrainingById,
  updateTraining,
} from "../controllers/training.controller.js";

const trainingRouter = express.Router();

trainingRouter.get("/all", getAllTrainings);

trainingRouter.get("/trainer/:trainerId", getTrainerTrainings);

trainingRouter.get("/:trainingId", getTrainingById);

trainingRouter.post("/add", addTraining);

trainingRouter.patch("/update/:trainingId", updateTraining);

trainingRouter.delete("/delete/:trainingId", deleteTraining);

export default trainingRouter;
