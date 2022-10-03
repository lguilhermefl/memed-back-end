import { Router } from "express";
import * as testController from "../controllers/testController";
import validateJWT from "../middlewares/validateJwtMiddleware";

const testRouter = Router();

testRouter.use(validateJWT());
testRouter.post("/", testController.insert);

export default testRouter;
