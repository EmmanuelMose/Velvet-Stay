"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const users_router_1 = __importDefault(require("../src/users/users.router"));
const rooms_router_1 = __importDefault(require("./rooms/rooms.router"));
const hotels_router_1 = __importDefault(require("./hotels/hotels.router"));
const bookings_router_1 = __importDefault(require("./bookings/bookings.router"));
const payments_router_1 = __importDefault(require("./payments/payments.router"));
const customerSupportTickets_router_1 = __importDefault(require("./customerSupportTickets/customerSupportTickets.router"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Routes
(0, users_router_1.default)(app);
(0, rooms_router_1.default)(app);
(0, hotels_router_1.default)(app);
(0, bookings_router_1.default)(app);
(0, payments_router_1.default)(app);
(0, customerSupportTickets_router_1.default)(app);
app.get("/", async (req, res) => {
    res.send("Hotel Management API is running!");
});
// Start server
app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});
