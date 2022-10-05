import { Router } from "express";
import * as appointmentController from "../controllers/appointmentController";
import validateJWT from "../middlewares/validateJwtMiddleware";

const appointmentRouter = Router();

appointmentRouter.use(validateJWT());
appointmentRouter.post("/", appointmentController.insert);

export default appointmentRouter;
