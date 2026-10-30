import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import YachtRoute from "./Routes/YachtRoute.js";
import userRoute from "./Routes/UserRoute.js";
import BookingsRoute from "./Routes/BookingRoute.js";
import { connectRedis } from "./configs/redis.js";
const app = express();

app.use(express.json());
app.use("/yachts", YachtRoute);
app.use("/users", userRoute);
app.use("/bookings", BookingsRoute);
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGODB_URI as string)
  .then(async () => {
    console.log("MongoDB connected");
    await connectRedis();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });
