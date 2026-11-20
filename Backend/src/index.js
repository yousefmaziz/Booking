import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import YachtRoute from "./Routes/YachtRoute.js";
import userRoute from "./Routes/UserRoute.js";
import BookingsRoute from "./Routes/BookingRoute.js";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./configs/swagger.js";
const app = express();
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
    customCssUrl: "https://cdn.jsdelivr.net/npm/swagger-ui-dist@5/swagger-ui.css",
    customJs: [
        "https://cdn.jsdelivr.net/npm/swagger-ui-dist@5/swagger-ui-bundle.js",
        "https://cdn.jsdelivr.net/npm/swagger-ui-dist@5/swagger-ui-standalone-preset.js",
    ],
    customSiteTitle: "Yacht Booking API",
}));
app.get("/api-docs.json", (req, res) => {
    res.json(swaggerSpec);
});
// Database connection
let connectionPromise = null;
const connectDB = async () => {
    if (mongoose.connection.readyState === 1) {
        return;
    }
    if (!connectionPromise) {
        connectionPromise = mongoose
            .connect(process.env.MONGODB_URI)
            .catch((error) => {
            connectionPromise = null;
            throw error;
        });
    }
    await connectionPromise;
};
// Health endpoint
app.get("/", (req, res) => {
    res.status(200).json({
        message: "Yacht Booking API is running",
        status: "success",
    });
});
// Database middleware
app.use(async (req, res, next) => {
    try {
        await connectDB();
        next();
    }
    catch (error) {
        console.error("MongoDB connection error:", error);
        res.status(503).json({
            message: "Database unavailable",
        });
    }
});
// Routes
app.use("/yachts", YachtRoute);
app.use("/users", userRoute);
app.use("/bookings", BookingsRoute);
// Local development
if (!process.env.VERCEL) {
    const PORT = process.env.PORT || 5000;
    connectDB()
        .then(async () => {
        console.log("MongoDB connected");
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
        .catch(console.error);
}
export default app;
//# sourceMappingURL=index.js.map