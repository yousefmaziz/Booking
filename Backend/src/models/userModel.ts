import mongoose, { Schema } from "mongoose";

interface User {
  username: string;
  email: string;
  password: string;
  role: "user" | "admin";
}

const UserSchema = new Schema<User>({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], default: "user" },
});

const UserModel = mongoose.model<User>("User", UserSchema);

export default UserModel;
