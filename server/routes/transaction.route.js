import { Router } from "express";
import { addTransaction } from "../controllers/transaction.controller.js";

const router = Router();

router.post("/addTransaction", addTransaction);

export { router };
