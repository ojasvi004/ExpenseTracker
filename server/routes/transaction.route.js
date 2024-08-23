import { Router } from "express";
import {
  addTransaction,
  showTransaction,
} from "../controllers/transaction.controller.js";
import { verifyToken } from "../middlewares/verifyToken.middleware.js";

const router = Router();

router.post("/addTransaction", verifyToken, addTransaction);
router.get("/showTransaction", verifyToken, showTransaction);

export { router };
