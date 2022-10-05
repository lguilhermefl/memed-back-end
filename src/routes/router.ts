import { Router } from "express";
import userRouter from "./userRouter";
import testRouter from "./testRouter";
import testFilesRouter from "./testFilesRouter";
import appointmentRouter from "./appointmentRouter";
import appointmentFilesRouter from "./appointmentFilesRouter";

const router = Router();
router.use(userRouter);
router.use("/tests", testRouter);
router.use("/tests/files", testFilesRouter);
router.use("/appointments", appointmentRouter);
router.use("/appointments/files", appointmentFilesRouter);

export default router;
