import { Router } from "express";
import * as testController from "../controllers/testController";
import validateJWT from "../middlewares/validateJwtMiddleware";
import { testSchema, updateTestSchema } from "../schemas/testSchema";
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
testRouter.put(
  "/:testId",
  validateBodySchemaMiddleware(updateTestSchema),
  testController.update
);

export default testRouter;
