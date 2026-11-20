import mongoose from "mongoose";
interface Booking {
    userId: mongoose.Types.ObjectId;
    yachtId: mongoose.Types.ObjectId;
    startDate: Date;
    endDate: Date;
    totalPrice: number;
    status: "pending" | "confirmed" | "cancelled";
}
declare const BookingModel: mongoose.Model<Booking, {}, {}, {}, mongoose.Document<unknown, {}, Booking, {}, mongoose.DefaultSchemaOptions> & Booking & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}, any, Booking>;
export default BookingModel;
//# sourceMappingURL=BookingModel.d.ts.map