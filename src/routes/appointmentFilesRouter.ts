import { Router } from "express";
import multer from "multer";
import multerConfig from "../config/multer";
import validateJWT from "../middlewares/validateJwtMiddleware";
import * as appointmentFilesController from "../controllers/appointmentFilesController";

const appointmentFilesRouter = Router();

appointmentFilesRouter.use(validateJWT());
appointmentFilesRouter.post(
  "/upload/:testId",
  multer(multerConfig).single("file"),
  appointmentFilesController.insert
);
appointmentFilesRouter.delete("/:id", appointmentFilesController.remove);

export default appointmentFilesRouter;
