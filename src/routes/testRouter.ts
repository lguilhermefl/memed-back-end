import { Router } from "express";
import * as testController from "../controllers/testController";
import validateJWT from "../middlewares/validateJwtMiddleware";
import { testSchema } from "../schemas/testSchema";
import validateBodySchemaMiddleware from "../middlewares/validateBodySchema";

const testRouter = Router();

testRouter.use(validateJWT());
testRouter.post(
  "/",
  validateBodySchemaMiddleware(testSchema),
  testController.insert
);
testRouter.get("/", testController.getAll);
testRouter.delete("/", testController.remove);

export default testRouter;
