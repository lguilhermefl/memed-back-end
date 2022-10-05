import { Router } from "express";
import testFilesRouter from "./testFilesRouter";
import userRouter from "./userRouter";
import testRouter from "./testRouter";

const router = Router();
router.use(userRouter);
router.use("/tests", testRouter);
router.use("/tests/files", testFilesRouter);

export default router;
