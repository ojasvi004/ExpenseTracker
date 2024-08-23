import { Router } from "express";
import {
  addTransaction,
  showTransaction,
} from "../controllers/transaction.controller.js";

const router = Router();

router.post("/addTransaction", addTransaction);
router.get("/showTransaction", showTransaction);

export { router };
