import mongoose, { Schema } from "mongoose";
const BookingSchema = new Schema({
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
const BookingModel = mongoose.model("Booking", BookingSchema);
export default BookingModel;
//# sourceMappingURL=BookingModel.js.map