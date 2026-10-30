import mongoose, { Schema } from "mongoose";

export interface Yacht {
  name: string;
  description: string;
  pricePerDay: number;
  image: string;
  location: string;
  capacity: number;
  available: boolean;
}

const yachtSchema = new Schema<Yacht>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  pricePerDay: { type: Number, required: true },
  image: { type: String },
  location: { type: String, required: true },
  capacity: { type: Number, required: true },
  available: { type: Boolean, required: true, default: true },
});

const YachtModel = mongoose.model<Yacht>("Yacht", yachtSchema);

export default YachtModel;
