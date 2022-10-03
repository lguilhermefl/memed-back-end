import { Router } from "express";
import * as userController from "../controllers/userController";

const userRouter = Router();

userRouter.post("/sign-up", userController.insert);
userRouter.post("/", userController.signIn);

export default userRouter;
