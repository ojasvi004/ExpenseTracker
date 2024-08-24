import { Router } from "express";
import {
  addTransaction,
  showAllTransactions,
  deleteTransaction,
  updateTransaction,
} from "../controllers/transaction.controller.js";
import { verifyToken } from "../middlewares/verifyToken.middleware.js";

const router = Router();

router.post("/transactions", verifyToken, addTransaction);
router.get("/transactions", verifyToken, showAllTransactions);
router.delete("/transactions/:id", verifyToken, deleteTransaction);
router.patch("/transactions/:id", verifyToken, updateTransaction);

export { router };
