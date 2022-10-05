import { Router } from "express";
import userRouter from "./userRouter";
import testRouter from "./testRouter";
import testFilesRouter from "./testFilesRouter";
import appointmentRouter from "./appointmentRouter";

const router = Router();
router.use(userRouter);
router.use("/tests", testRouter);
router.use("/tests/files", testFilesRouter);
router.use("/appointments", appointmentRouter);

export default router;
