import {
  BookingService,
  cancelBookingService,
  confirmBookingService,
  getAllBookingsService,
  getBookingsByUserId,
} from "../services/BookingService.js";
import type { Request, Response } from "express";

export const createBooking = async (req: Request, res: Response) => {
  try {
    const { yachtId, startDate, endDate } = req.body;

    const userId = (req as any).user?.id;

    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized user",
      });
    }

    const booking = await BookingService({
      userId,
      yachtId,
      startDate,
      endDate,
    });

    return res.status(201).json({
      message: "Booking created successfully",
      booking,
    });
  } catch (error) {
    console.error(error);

    return res.status(400).json({
      message:
        error instanceof Error ? error.message : "Failed to create booking",
    });
  }
};

export const myBookings = async (req: Request, res: Response) => {
  const userId = (req as any).user?.id;

  if (!userId) {
    return res.status(401).json({
      message: "Unauthorized user",
    });
  }

  try {
    const bookings = await getBookingsByUserId(userId);
    return res.status(200).json({
      message: "Bookings retrieved successfully",
      bookings,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message:
        error instanceof Error ? error.message : "Failed to retrieve bookings",
    });
  }
};

export const cancelBooking = async (req: Request, res: Response) => {
  const userId = (req as any).user?.id;
  const { bookingId } = req.params;

  if (!userId) {
    return res.status(401).json({
      message: "Unauthorized user",
    });
  }

  if (!bookingId) {
    return res.status(400).json({
      message: "Booking ID is required",
    });
  }

  try {
    const booking = await cancelBookingService(bookingId, userId);

    return res.status(200).json({
      message: "Booking cancelled successfully",
      booking,
    });
  } catch (error) {
    console.error(error);

    return res.status(400).json({
      message:
        error instanceof Error ? error.message : "Failed to cancel booking",
    });
  }
};

export const getAllBookings = async (req: Request, res: Response) => {
  try {
    const bookings = await getAllBookingsService();
    return res.status(200).json({
      message: "Bookings retrieved  successfully",
      bookings,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Failed to retrieve bookings",
    });
  }
};

export const confirmBooking = async (req: Request, res: Response) => {
  try {
    const { bookingId } = req.params;

    if (typeof bookingId !== "string") {
      return res.status(400).json({
        message: "Invalid booking ID",
      });
    }
    const booking = await confirmBookingService(bookingId);
    return res.status(200).json({
      message: "Booking confirmed successfully",
      booking,
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      message:
        error instanceof Error ? error.message : "Failed to confirm booking",
    });
  }
};
