import { Router } from "express";
import multer from "multer";
import multerConfig from "../config/multer";
import validateJWT from "../middlewares/validateJwtMiddleware";
import * as testFilesController from "../controllers/testFilesController";

const testFilesRouter = Router();

testFilesRouter.use(validateJWT());
testFilesRouter.get("/:testId", testFilesController.getAll);
testFilesRouter.post(
  "/:testId",
  multer(multerConfig).single("file"),
  testFilesController.insert
);
testFilesRouter.delete("/:id", testFilesController.remove);
testFilesRouter.delete("/all/:testId", testFilesController.removeAll);

export default testFilesRouter;
