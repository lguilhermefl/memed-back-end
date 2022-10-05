import { Router } from "express";
import * as userController from "../controllers/userController";
import { userSchema } from "../schemas/userSchema";
import validateBodySchemaMiddleware from "../middlewares/validateBodySchema";

const userRouter = Router();

userRouter.use(validateBodySchemaMiddleware(userSchema));
userRouter.post("/sign-up", userController.insert);
userRouter.post("/", userController.signIn);

export default userRouter;
