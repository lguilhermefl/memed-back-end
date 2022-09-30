import { Router } from "express";
import testFilesRouter from "./testFilesRouter";

const router = Router();
router.use("/test-files", testFilesRouter);

export default router;
