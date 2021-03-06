import express from "express";
import { create, list, show } from "../controllers/flashCard";

const router = express.Router();

router.get("/", list);
router.get("/:id", show);
router.post("/", create);

export default router;
