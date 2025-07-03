"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingToPayment = exports.RoomToBookings = exports.HotelToRooms = exports.UserToTickets = exports.UserToBookings = exports.CustomerSupportTickets = exports.Payments = exports.Bookings = exports.Rooms = exports.Hotels = exports.Users = exports.TicketStatusEnum = exports.PaymentStatusEnum = exports.BookingStatusEnum = exports.RoleEnum = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
// Enums
exports.RoleEnum = (0, pg_core_1.pgEnum)("Role", ["user", "admin"]);
exports.BookingStatusEnum = (0, pg_core_1.pgEnum)("BookingStatus", ["Pending", "Confirmed", "Cancelled"]);
exports.PaymentStatusEnum = (0, pg_core_1.pgEnum)("PaymentStatus", ["Pending", "Completed", "Failed"]);
exports.TicketStatusEnum = (0, pg_core_1.pgEnum)("TicketStatus", ["Open", "Resolved"]);
// Tables
exports.Users = (0, pg_core_1.pgTable)("Users", {
    UserId: (0, pg_core_1.serial)("UserId").primaryKey(),
    FirstName: (0, pg_core_1.varchar)("FirstName", { length: 100 }),
    LastName: (0, pg_core_1.varchar)("LastName", { length: 100 }),
    Email: (0, pg_core_1.varchar)("Email", { length: 255 }).unique(),
    Password: (0, pg_core_1.varchar)("Password", { length: 255 }),
    ContactPhone: (0, pg_core_1.varchar)("ContactPhone", { length: 20 }),
    Address: (0, pg_core_1.text)("Address"),
    Role: (0, exports.RoleEnum)("Role").default("user"),
    CreatedAt: (0, pg_core_1.timestamp)("CreatedAt").defaultNow(),
    UpdatedAt: (0, pg_core_1.timestamp)("UpdatedAt").defaultNow(),
});
exports.Hotels = (0, pg_core_1.pgTable)("Hotels", {
    HotelId: (0, pg_core_1.serial)("HotelId").primaryKey(),
    Name: (0, pg_core_1.varchar)("Name", { length: 255 }),
    Location: (0, pg_core_1.varchar)("Location", { length: 255 }),
    Address: (0, pg_core_1.text)("Address"),
    ContactPhone: (0, pg_core_1.varchar)("ContactPhone", { length: 20 }),
    Category: (0, pg_core_1.varchar)("Category", { length: 100 }),
    Rating: (0, pg_core_1.real)("Rating"),
    CreatedAt: (0, pg_core_1.timestamp)("CreatedAt").defaultNow(),
    UpdatedAt: (0, pg_core_1.timestamp)("UpdatedAt").defaultNow(),
});
exports.Rooms = (0, pg_core_1.pgTable)("Rooms", {
    RoomId: (0, pg_core_1.serial)("RoomId").primaryKey(),
    HotelId: (0, pg_core_1.integer)("HotelId").references(() => exports.Hotels.HotelId),
    RoomType: (0, pg_core_1.varchar)("RoomType", { length: 100 }),
    PricePerNight: (0, pg_core_1.real)("PricePerNight"),
    Capacity: (0, pg_core_1.integer)("Capacity"),
    Amenities: (0, pg_core_1.text)("Amenities"),
    IsAvailable: (0, pg_core_1.boolean)("IsAvailable").default(true),
    CreatedAt: (0, pg_core_1.timestamp)("CreatedAt").defaultNow(),
});
exports.Bookings = (0, pg_core_1.pgTable)("Bookings", {
    BookingId: (0, pg_core_1.serial)("BookingId").primaryKey(),
    UserId: (0, pg_core_1.integer)("UserId").references(() => exports.Users.UserId),
    RoomId: (0, pg_core_1.integer)("RoomId").references(() => exports.Rooms.RoomId),
    CheckInDate: (0, pg_core_1.timestamp)("CheckInDate"),
    CheckOutDate: (0, pg_core_1.timestamp)("CheckOutDate"),
    TotalAmount: (0, pg_core_1.real)("TotalAmount"),
    BookingStatus: (0, exports.BookingStatusEnum)("BookingStatus").default("Pending"),
    CreatedAt: (0, pg_core_1.timestamp)("CreatedAt").defaultNow(),
    UpdatedAt: (0, pg_core_1.timestamp)("UpdatedAt").defaultNow(),
});
exports.Payments = (0, pg_core_1.pgTable)("Payments", {
    PaymentId: (0, pg_core_1.serial)("PaymentId").primaryKey(),
    BookingId: (0, pg_core_1.integer)("BookingId").references(() => exports.Bookings.BookingId),
    Amount: (0, pg_core_1.real)("Amount"),
    PaymentStatus: (0, exports.PaymentStatusEnum)("PaymentStatus").default("Pending"),
    PaymentDate: (0, pg_core_1.timestamp)("PaymentDate").defaultNow(),
    PaymentMethod: (0, pg_core_1.varchar)("PaymentMethod", { length: 100 }),
    TransactionId: (0, pg_core_1.varchar)("TransactionId", { length: 255 }),
    CreatedAt: (0, pg_core_1.timestamp)("CreatedAt").defaultNow(),
    UpdatedAt: (0, pg_core_1.timestamp)("UpdatedAt").defaultNow(),
});
exports.CustomerSupportTickets = (0, pg_core_1.pgTable)("CustomerSupportTickets", {
    TicketId: (0, pg_core_1.serial)("TicketId").primaryKey(),
    UserId: (0, pg_core_1.integer)("UserId").references(() => exports.Users.UserId),
    Subject: (0, pg_core_1.varchar)("Subject", { length: 255 }),
    Description: (0, pg_core_1.text)("Description"),
    Status: (0, exports.TicketStatusEnum)("Status").default("Open"),
    CreatedAt: (0, pg_core_1.timestamp)("CreatedAt").defaultNow(),
    UpdatedAt: (0, pg_core_1.timestamp)("UpdatedAt").defaultNow(),
});
//Relationships.
exports.UserToBookings = {
    one: exports.Users.UserId,
    many: exports.Bookings.UserId,
};
exports.UserToTickets = {
    one: exports.Users.UserId,
    many: exports.CustomerSupportTickets.UserId,
};
exports.HotelToRooms = {
    one: exports.Hotels.HotelId,
    many: exports.Rooms.HotelId,
};
exports.RoomToBookings = {
    one: exports.Rooms.RoomId,
    many: exports.Bookings.RoomId,
};
exports.BookingToPayment = {
    one: exports.Bookings.BookingId,
    oneToOne: exports.Payments.BookingId,
};
