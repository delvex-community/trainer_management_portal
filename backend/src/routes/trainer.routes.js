import express from "express";
import {
  addTrainer,
  deleteTrainer,
  getAllTrainers,
  getRating,
  getTrainerById,
  updateNonTechRating,
  updateTechRating,
  updateTrainer,
} from "../controllers/trainer.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const trainerRouter = express.Router();

trainerRouter.get("/all", getAllTrainers);

trainerRouter.post("/add", upload.single("file"), addTrainer);

trainerRouter.get("/:trainerId", getTrainerById);

trainerRouter.get("/rating/:trainerId", getRating);

trainerRouter.patch("/update/:trainerId", upload.single("file"), updateTrainer);

trainerRouter.patch("/update-rating/tech/:trainerId", updateTechRating);

trainerRouter.patch("/update-rating/nontech/:trainerId", updateNonTechRating);

trainerRouter.delete("/delete/:trainerId", deleteTrainer);

export default trainerRouter;
