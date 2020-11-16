import express from "express";

import userRouter from "./user/router";
import flashCardRouter from "./flashCard/router";

const router = express.Router();

router.use("/user", userRouter);
router.use("/flashCard", flashCardRouter);

export default router;
