import BookingModel from "../models/BookingModel.js";
import YachtModel from "../models/YachtModel.js";

interface BookingServiceProps {
  userId: string;
  yachtId: string;
  startDate: string;
  endDate: string;
}
export const BookingService = async (props: BookingServiceProps) => {
  const { userId, yachtId, startDate, endDate } = props;

  const start = new Date(startDate);
  const end = new Date(endDate);

  // 1. Validate dates
  if (
    Number.isNaN(start.getTime()) ||
    Number.isNaN(end.getTime()) ||
    start >= end
  ) {
    throw new Error("Invalid date range");
  }

  // Date-only bookings use UTC calendar days
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);

  if (start < today) {
    throw new Error("Start date cannot be in the past");
  }

  // 2. Start MongoDB session
  const session = await BookingModel.startSession();

  try {
    // 3. Execute all booking operations in one transaction
    const booking = await session.withTransaction(async () => {
      // Find yacht
      const yacht = await YachtModel.findById(yachtId).session(session);

      if (!yacht) {
        throw new Error("Yacht not found");
      }

      if (!yacht.available) {
        throw new Error("Yacht is not available");
      }

      // 4. Atomic version update
      const updatedYacht = await YachtModel.findOneAndUpdate(
        {
          _id: yachtId,
          __v: yacht.__v,
          available: true,
        },
        {
          $inc: { __v: 1 },
        },
        {
          new: true,
          session,
        },
      );

      if (!updatedYacht) {
        throw new Error("Booking conflict, please try again");
      }

      // 5. Check overlapping bookings
      const existingBooking = await BookingModel.findOne({
        yachtId,
        status: { $in: ["confirmed", "pending"] },
        startDate: { $lt: end },
        endDate: { $gt: start },
      }).session(session);

      if (existingBooking) {
        throw new Error("Yacht is already booked for the selected date range");
      }

      // 6. Calculate total price
      const millisecondsPerDay = 1000 * 60 * 60 * 24;

      const numberOfDays = Math.ceil(
        (end.getTime() - start.getTime()) / millisecondsPerDay,
      );

      const totalPrice = yacht.pricePerDay * numberOfDays;

      // 7. Create booking inside transaction
      const [createdBooking] = await BookingModel.create(
        [
          {
            userId,
            yachtId,
            startDate: start,
            endDate: end,
            totalPrice,
            status: "pending",
          },
        ],
        { session },
      );

      return createdBooking;
    });

    if (!booking) {
      throw new Error("Booking transaction failed");
    }

    return booking;
  } finally {
    // 8. Always close session
    await session.endSession();
  }
};

export const getBookingsByUserId = async (userId: string) => {
  const bookings = await BookingModel.find({ userId }).populate("yachtId");
  return bookings;
};

export const cancelBookingService = async (
  bookingId: string,
  userId: string,
) => {
  const booking = await BookingModel.findOne({ _id: bookingId, userId });
  if (!booking) {
    throw new Error("Booking not found or you are not authorized to cancel it");
  }
  if (booking.status === "cancelled") {
    throw new Error("Booking is already cancelled");
  }
  booking.status = "cancelled";
  await booking.save();

  return booking;
};

export const getAllBookingsService = async () => {
  const allBookings = await BookingModel.find()
    .populate("yachtId", "name image location pricePerDay")
    .populate("userId", "username email role");
  return allBookings;
};

export const confirmBookingService = async (bookingId: string) => {
  const booking = await BookingModel.findById(bookingId);
  if (!booking) {
    throw new Error("Booking not found");
  }
  if (booking.status !== "pending") {
    throw new Error("Only pending bookings can be confirmed");
  }
  booking.status = "confirmed";
  await booking.save();
  return booking;
};
