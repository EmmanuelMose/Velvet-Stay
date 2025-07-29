import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./users/users.router.js";
import roomRoutes from "./rooms/rooms.router.js";
import hotelRoutes from "./hotels/hotels.router.js";
import bookingRoutes from "./bookings/bookings.router.js";
import paymentRoutes from "./payments/payments.router.js";
import customerSupportRoutes from "./customerSupportTickets/customerSupportTickets.router.js";
import authRoutes from "./auth/auth.router.js";
import chatRoute from "./routes/chat.js";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(express.json());
// Register routes
app.use('/api', chatRoute); // Chatbot API: /api/chat
userRoutes(app);
roomRoutes(app);
hotelRoutes(app);
bookingRoutes(app);
paymentRoutes(app);
customerSupportRoutes(app);
authRoutes(app);
app.get("/", (_req, res) => {
    res.send("Hotel Management API is running!");
});
app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});
export default app;
