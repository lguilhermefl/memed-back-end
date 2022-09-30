import { Router } from "express";
import multer from "multer";
import multerConfig from "../config/multer";
import * as testFilesController from "../controllers/testFilesController";

const testFilesRouter = Router();

testFilesRouter.post(
  "/upload/:testId",
  multer(multerConfig).single("file"),
  testFilesController.insert
);
testFilesRouter.delete("/:id", testFilesController.remove);

export default testFilesRouter;
