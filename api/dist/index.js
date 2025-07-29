import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./users/users.router";
import roomRoutes from "./rooms/rooms.router";
import hotelRoutes from "./hotels/hotels.router";
import bookingRoutes from "./bookings/bookings.router";
import paymentRoutes from "./payments/payments.router";
import customerSupportRoutes from "./customerSupportTickets/customerSupportTickets.router";
import authRoutes from "./auth/auth.router";
import chatRoute from "./routes/chat";
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
