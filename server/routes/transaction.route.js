import { Router } from "express";
import {
  addTransaction,
  showAllTransactions,
  deleteTransaction,
} from "../controllers/transaction.controller.js";
import { verifyToken } from "../middlewares/verifyToken.middleware.js";

const router = Router();

router.post("/addTransaction", verifyToken, addTransaction);
router.get("/showAllTransactions", verifyToken, showAllTransactions);
router.delete("/deleteTransaction/:id", verifyToken, deleteTransaction);

export { router };
