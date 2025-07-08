"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingToPayment = exports.roomToBookings = exports.hotelToRooms = exports.userToTickets = exports.userToBookings = exports.customerSupportTickets = exports.payments = exports.bookings = exports.rooms = exports.hotels = exports.users = exports.ticketStatusEnum = exports.paymentStatusEnum = exports.bookingStatusEnum = exports.roleEnum = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
// Enums
exports.roleEnum = (0, pg_core_1.pgEnum)("Role", ["User", "Admin"]);
exports.bookingStatusEnum = (0, pg_core_1.pgEnum)("BookingStatus", ["Pending", "Confirmed", "Cancelled"]);
exports.paymentStatusEnum = (0, pg_core_1.pgEnum)("PaymentStatus", ["Pending", "Completed", "Failed"]);
exports.ticketStatusEnum = (0, pg_core_1.pgEnum)("TicketStatus", ["Open", "Resolved"]);
// Tables
exports.users = (0, pg_core_1.pgTable)("Users", {
    userId: (0, pg_core_1.serial)("UserId").primaryKey(),
    firstName: (0, pg_core_1.varchar)("FirstName", { length: 100 }),
    lastName: (0, pg_core_1.varchar)("LastName", { length: 100 }),
    email: (0, pg_core_1.varchar)("Email", { length: 255 }).unique(),
    password: (0, pg_core_1.varchar)("Password", { length: 255 }),
    contactPhone: (0, pg_core_1.varchar)("ContactPhone", { length: 20 }),
    address: (0, pg_core_1.text)("Address"),
    role: (0, exports.roleEnum)("Role").default("User"),
    createdAt: (0, pg_core_1.timestamp)("CreatedAt").defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)("UpdatedAt").defaultNow(),
});
exports.hotels = (0, pg_core_1.pgTable)("Hotels", {
    hotelId: (0, pg_core_1.serial)("HotelId").primaryKey(),
    name: (0, pg_core_1.varchar)("Name", { length: 255 }),
    location: (0, pg_core_1.varchar)("Location", { length: 255 }),
    address: (0, pg_core_1.text)("Address"),
    contactPhone: (0, pg_core_1.varchar)("ContactPhone", { length: 20 }),
    category: (0, pg_core_1.varchar)("Category", { length: 100 }),
    rating: (0, pg_core_1.real)("Rating"),
    createdAt: (0, pg_core_1.timestamp)("CreatedAt").defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)("UpdatedAt").defaultNow(),
});
exports.rooms = (0, pg_core_1.pgTable)("Rooms", {
    roomId: (0, pg_core_1.serial)("RoomId").primaryKey(),
    hotelId: (0, pg_core_1.integer)("HotelId").references(() => exports.hotels.hotelId),
    roomType: (0, pg_core_1.varchar)("RoomType", { length: 100 }),
    pricePerNight: (0, pg_core_1.real)("PricePerNight"),
    capacity: (0, pg_core_1.integer)("Capacity"),
    amenities: (0, pg_core_1.text)("Amenities"),
    isAvailable: (0, pg_core_1.boolean)("IsAvailable").default(true),
    createdAt: (0, pg_core_1.timestamp)("CreatedAt").defaultNow(),
});
exports.bookings = (0, pg_core_1.pgTable)("Bookings", {
    bookingId: (0, pg_core_1.serial)("BookingId").primaryKey(),
    userId: (0, pg_core_1.integer)("UserId").references(() => exports.users.userId),
    roomId: (0, pg_core_1.integer)("RoomId").references(() => exports.rooms.roomId),
    checkInDate: (0, pg_core_1.timestamp)("CheckInDate"),
    checkOutDate: (0, pg_core_1.timestamp)("CheckOutDate"),
    totalAmount: (0, pg_core_1.real)("TotalAmount"),
    bookingStatus: (0, exports.bookingStatusEnum)("BookingStatus").default("Pending"),
    createdAt: (0, pg_core_1.timestamp)("CreatedAt").defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)("UpdatedAt").defaultNow(),
});
exports.payments = (0, pg_core_1.pgTable)("Payments", {
    paymentId: (0, pg_core_1.serial)("PaymentId").primaryKey(),
    bookingId: (0, pg_core_1.integer)("BookingId").references(() => exports.bookings.bookingId),
    amount: (0, pg_core_1.real)("Amount"),
    paymentStatus: (0, exports.paymentStatusEnum)("PaymentStatus").default("Pending"),
    paymentDate: (0, pg_core_1.timestamp)("PaymentDate").defaultNow(),
    paymentMethod: (0, pg_core_1.varchar)("PaymentMethod", { length: 100 }),
    transactionId: (0, pg_core_1.varchar)("TransactionId", { length: 255 }),
    createdAt: (0, pg_core_1.timestamp)("CreatedAt").defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)("UpdatedAt").defaultNow(),
});
exports.customerSupportTickets = (0, pg_core_1.pgTable)("CustomerSupportTickets", {
    ticketId: (0, pg_core_1.serial)("TicketId").primaryKey(),
    userId: (0, pg_core_1.integer)("UserId").references(() => exports.users.userId),
    subject: (0, pg_core_1.varchar)("Subject", { length: 255 }),
    description: (0, pg_core_1.text)("Description"),
    status: (0, exports.ticketStatusEnum)("Status").default("Open"),
    createdAt: (0, pg_core_1.timestamp)("CreatedAt").defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)("UpdatedAt").defaultNow(),
});
// Relationships
exports.userToBookings = {
    one: exports.users.userId,
    many: exports.bookings.userId,
};
exports.userToTickets = {
    one: exports.users.userId,
    many: exports.customerSupportTickets.userId,
};
exports.hotelToRooms = {
    one: exports.hotels.hotelId,
    many: exports.rooms.hotelId,
};
exports.roomToBookings = {
    one: exports.rooms.roomId,
    many: exports.bookings.roomId,
};
exports.bookingToPayment = {
    one: exports.bookings.bookingId,
    onetoone: exports.payments.bookingId,
};
