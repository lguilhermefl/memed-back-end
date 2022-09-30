import { Router } from "express";
import multer from "multer";
import multerConfig from "../config/multer";
import * as testFilesController from "../controllers/testFilesController";

const testFilesRouter = Router();

testFilesRouter.post(
  "/upload",
  multer(multerConfig).single("file"),
  testFilesController.insert
);

export default testFilesRouter;
