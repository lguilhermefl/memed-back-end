import { Router } from "express";
import * as appointmentController from "../controllers/appointmentController";
import validateJWT from "../middlewares/validateJwtMiddleware";
import { appointmentSchema } from "../schemas/appointmentSchema";
import validateBodySchemaMiddleware from "../middlewares/validateBodySchema";

const appointmentRouter = Router();

appointmentRouter.use(validateJWT());
appointmentRouter.post(
  "/",
  validateBodySchemaMiddleware(appointmentSchema),
  appointmentController.insert
);
appointmentRouter.get("/", appointmentController.getAll);
appointmentRouter.delete("/", appointmentController.remove);

export default appointmentRouter;
