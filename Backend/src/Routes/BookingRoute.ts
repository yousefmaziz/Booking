import express from "express";
import { authMiddleware } from "../middlewares/AuthMiddleware.js";
import {
  cancelBooking,
  createBooking,
  getAllBookings,
  myBookings,
  confirmBooking,
} from "../Controllers/BookingController.js";
import { adminMiddleware } from "../middlewares/adminMiddleware.js";
import {
  bookingIdParamsSchema,
  bookingSchema,
} from "../Validators/BookingValidate.js";
import { validateMiddleware } from "../middlewares/validateMiddleware.js";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  validateMiddleware(bookingSchema),
  createBooking,
);
router.get("/all", authMiddleware, adminMiddleware, getAllBookings);
router.get("/myBookings", authMiddleware, myBookings);
router.patch(
  "/:bookingId/cancel",
  authMiddleware,
  validateMiddleware(bookingIdParamsSchema, "params"),
  cancelBooking,
);
router.patch(
  "/:bookingId/confirm",
  authMiddleware,
  adminMiddleware,
  validateMiddleware(bookingIdParamsSchema, "params"),
  confirmBooking,
);
export default router;
