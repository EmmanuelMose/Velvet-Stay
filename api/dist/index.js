import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./users/users.router";
import roomRoutes from "./rooms/rooms.router";
import hotelRoutes from "./hotels/hotels.router";
import bookingRoutes from "./bookings/bookings.router";
import paymentRoutes from "./payments/payments.router";
import customerSupportRoutes from "./customerSupportTickets/customerSupportTickets.router";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
// Middleware
app.use(cors());
app.use(express.json());
// Routes
userRoutes(app);
roomRoutes(app);
hotelRoutes(app);
bookingRoutes(app);
paymentRoutes(app);
customerSupportRoutes(app);
app.get("/", (_req, res) => {
    res.send("Hotel Management API is running!");
});
// Start server
app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});
export default app;
