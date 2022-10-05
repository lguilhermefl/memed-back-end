import { Router } from "express";
import * as userController from "../controllers/userController";
import { userSchema } from "../schemas/userSchema";
import validateBodySchemaMiddleware from "../middlewares/validateBodySchema";

const userRouter = Router();
userRouter.post(
  "/sign-up",
  validateBodySchemaMiddleware(userSchema),
  userController.insert
);
userRouter.post(
  "/",
  validateBodySchemaMiddleware(userSchema),
  userController.signIn
);

export default userRouter;
