import { Router } from "express";
import * as userController from "../controllers/userController";
import { signInSchema, signUpSchema } from "../schemas/userSchema";
import validateBodySchemaMiddleware from "../middlewares/validateBodySchema";

const userRouter = Router();
userRouter.post(
  "/sign-up",
  validateBodySchemaMiddleware(signUpSchema),
  userController.insert
);
userRouter.post(
  "/sign-in",
  validateBodySchemaMiddleware(signInSchema),
  userController.signIn
);

export default userRouter;
