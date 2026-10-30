import express from "express";
import {
  createYacht,
  getAllYachts,
  getYachtById,
  updateYacht,
  deleteYacht,
} from "../Controllers/YachtController.js";
import { authMiddleware } from "../middlewares/AuthMiddleware.js";
import { adminMiddleware } from "../middlewares/adminMiddleware.js";
import {
  createYachtSchema,
  updateYachtSchema,
  yachtIdParamsSchema,
} from "../Validators/YachtValidate.js";
import { validateMiddleware } from "../middlewares/validateMiddleware.js";

const router = express.Router();

router.get("/", getAllYachts);

router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  validateMiddleware(createYachtSchema),
  createYacht,
);

router.get(
  "/:id",
  validateMiddleware(yachtIdParamsSchema, "params"),
  getYachtById,
);

router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,

  updateYacht,
);

router.delete("/:id", authMiddleware, adminMiddleware, deleteYacht);

export default router;
