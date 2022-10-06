import { Router } from "express";
import multer from "multer";
import multerConfig from "../config/multer";
import validateJWT from "../middlewares/validateJwtMiddleware";
import * as appointmentFilesController from "../controllers/appointmentFilesController";

const appointmentFilesRouter = Router();

appointmentFilesRouter.use(validateJWT());
appointmentFilesRouter.post(
  "/:testId",
  multer(multerConfig).single("file"),
  appointmentFilesController.insert
);
appointmentFilesRouter.delete("/:id", appointmentFilesController.remove);
appointmentFilesRouter.delete(
  "/all/:testId",
  appointmentFilesController.removeAll
);

export default appointmentFilesRouter;
