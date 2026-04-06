import { Router, type IRouter } from "express";
import healthRouter from "./health";
import universitiesRouter from "./universities";
import majorsRouter from "./majors";
import admissionRouter from "./admission";
import forumRouter from "./forum";
import statsRouter from "./stats";

const router: IRouter = Router();

router.use(healthRouter);
router.use("/universities", universitiesRouter);
router.use("/majors", majorsRouter);
router.use("/admission", admissionRouter);
router.use("/forum", forumRouter);
router.use("/stats", statsRouter);

export default router;
