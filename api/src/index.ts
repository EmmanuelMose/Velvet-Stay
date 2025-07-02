
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { db } from "./Drizzle/db";

// Load environment variables
dotenv.config();

const app = express();
const PORT =  3000;

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get("/", async (req, res) => {
  res.send("Hotel Management API is running!");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
