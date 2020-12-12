import express from "express";

// import userRouter from "./user/router";
import flashCardRouter from "./routes/flashCard";

const router = express.Router();

// router.use("/user", userRouter);
router.use("/flashCard", flashCardRouter);

export default router;
