import { Router } from "express";
import * as appointmentController from "../controllers/appointmentController";
import validateJWT from "../middlewares/validateJwtMiddleware";

const appointmentRouter = Router();

appointmentRouter.use(validateJWT());
appointmentRouter.post("/", appointmentController.insert);
appointmentRouter.get("/", appointmentController.getAll);
appointmentRouter.delete("/", appointmentController.remove);

export default appointmentRouter;
