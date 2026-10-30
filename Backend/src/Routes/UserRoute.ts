import express from "express";
import {
  registerUser,
  getAllUsers,
  loginUser,
} from "../Controllers/UserController.js";
import { adminMiddleware } from "../middlewares/adminMiddleware.js";
import { authMiddleware } from "../middlewares/AuthMiddleware.js";
import { loginSchema, registerSchema } from "../Validators/UserValidate.js";
import { validateMiddleware } from "../middlewares/validateMiddleware.js";
import {
  loginLimiter,
  registerLimiter,
} from "../middlewares/rateLimitMiddleware.js";
const router = express.Router();

router.get("/", authMiddleware, adminMiddleware, getAllUsers);

router.post(
  "/register",
  registerLimiter,
  validateMiddleware(registerSchema),
  registerUser,
);
router.post("/login", loginLimiter, validateMiddleware(loginSchema), loginUser);

export default router;
