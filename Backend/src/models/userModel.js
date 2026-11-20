import mongoose, { Schema } from "mongoose";
const UserSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
});
const UserModel = mongoose.model("User", UserSchema);
export default UserModel;
//# sourceMappingURL=userModel.js.map