import express from "express";
import dotenv from "dotenv";
import cors from "cors";


import db from "./Drizzle/db";
import userRoutes from "./users/users.router";
import roomRoutes from "./rooms/rooms.router";
import hotelRoutes from "./hotels/hotels.router";
import bookingRoutes from "./bookings/bookings.router";
import paymentRoutes from "./payments/payments.router";
import customerSupportRoutes from "./customerSupportTickets/customerSupportTickets.router";
import authRoutes from "./auth/auth.router";

// Load environment variables
dotenv.config();

// Create Express app
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true               
}));

// Middleware to parse JSON bodies
app.use(express.json());


userRoutes(app);
roomRoutes(app);
hotelRoutes(app);
bookingRoutes(app);
paymentRoutes(app);
customerSupportRoutes(app);
authRoutes(app);

// Health check route
app.get("/", (_req, res) => {
  res.send("Hotel Management API is running!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});

// Export app for testing or serverless usage
export default app;
