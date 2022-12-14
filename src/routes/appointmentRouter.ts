import { Router } from "express";
import * as appointmentController from "../controllers/appointmentController";
import validateJWT from "../middlewares/validateJwtMiddleware";
import {
  appointmentSchema,
  updateAppointmentSchema,
} from "../schemas/appointmentSchema";
import validateBodySchemaMiddleware from "../middlewares/validateBodySchema";

const appointmentRouter = Router();

appointmentRouter.use(validateJWT());
appointmentRouter.post(
  "/",
  validateBodySchemaMiddleware(appointmentSchema),
  appointmentController.insert
);
appointmentRouter.get("/", appointmentController.getAll);
appointmentRouter.get("/:appointmentId", appointmentController.get);
appointmentRouter.delete("/:appointmentId", appointmentController.remove);
appointmentRouter.put(
  "/:appointmentId",
  validateBodySchemaMiddleware(updateAppointmentSchema),
  appointmentController.update
);

export default appointmentRouter;
