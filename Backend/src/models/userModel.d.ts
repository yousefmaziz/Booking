import mongoose from "mongoose";
interface User {
    username: string;
    email: string;
    password: string;
    role: "user" | "admin";
}
declare const UserModel: mongoose.Model<User, {}, {}, {}, mongoose.Document<unknown, {}, User, {}, mongoose.DefaultSchemaOptions> & User & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}, any, User>;
export default UserModel;
//# sourceMappingURL=userModel.d.ts.map