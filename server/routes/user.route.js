import {
  register,
  login,
  logout,
  refreshToken,
} from "../controllers/auth.controller.js";
import { Router } from "express";
const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/refresh-token", refreshToken);

export { router };
