import express from "express";
import {
  getRatingLabels,
  updateNonTechRatingLabel,
  updateTechRatingLabel,
} from "../controllers/rating.controller.js";

const ratingRouter = express.Router();

ratingRouter.get("/label", getRatingLabels);

ratingRouter.patch("/label/tech", updateTechRatingLabel);

ratingRouter.patch("/label/nontech", updateNonTechRatingLabel);

export default ratingRouter;
