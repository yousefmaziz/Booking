import mongoose, { Schema } from "mongoose";
const yachtSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    pricePerDay: { type: Number, required: true },
    image: { type: String },
    location: { type: String, required: true },
    capacity: { type: Number, required: true },
    available: { type: Boolean, required: true, default: true },
});
const YachtModel = mongoose.model("Yacht", yachtSchema);
export default YachtModel;
//# sourceMappingURL=YachtModel.js.map