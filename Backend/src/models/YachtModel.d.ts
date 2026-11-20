import mongoose from "mongoose";
export interface Yacht {
    name: string;
    description: string;
    pricePerDay: number;
    image: string;
    location: string;
    capacity: number;
    available: boolean;
}
declare const YachtModel: mongoose.Model<Yacht, {}, {}, {}, mongoose.Document<unknown, {}, Yacht, {}, mongoose.DefaultSchemaOptions> & Yacht & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}, any, Yacht>;
export default YachtModel;
//# sourceMappingURL=YachtModel.d.ts.map