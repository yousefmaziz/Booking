import mongoose, { Schema } from "mongoose";

interface Booking {
  userId: mongoose.Types.ObjectId;
  yachtId: mongoose.Types.ObjectId;
  startDate: Date;
  endDate: Date;
  totalPrice: number;
  status: "pending" | "confirmed" | "cancelled";
}

const BookingSchema = new Schema<Booking>({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  yachtId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Yacht",
    required: true,
  },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  totalPrice: { type: Number, required: true },
  status: {
    type: String,
    enum: ["pending", "confirmed", "cancelled"],
    default: "pending",
  },
});

const BookingModel = mongoose.model<Booking>("Booking", BookingSchema);

export default BookingModel;
