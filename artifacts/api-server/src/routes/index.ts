import { Router, type IRouter } from "express";
import healthRouter from "./health";
import stripeRouter from "./stripe";
import enquiriesRouter from "./enquiries";
import adminRouter from "./admin";
import seoRouter from "./seo";

const router: IRouter = Router();

router.use(healthRouter);
router.use(stripeRouter);
router.use(enquiriesRouter);
router.use(adminRouter);
router.use(seoRouter);

export default router;
