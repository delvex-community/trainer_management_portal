import {
  addTechnology,
  deleteTechnology,
  getTechnologies,
  updateTechnology,
} from "../controllers/technology.controller.js";
import { Router } from "express";

const technologyRouter = Router();

technologyRouter.get("/all", getTechnologies);

technologyRouter.post("/add", addTechnology);

technologyRouter.patch("/:technologyId", updateTechnology);

technologyRouter.delete("/:technologyId", deleteTechnology);

export default technologyRouter;
