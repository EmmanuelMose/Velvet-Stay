
import {
  pgTable,
  serial,
  varchar,
  text,
  timestamp,
  integer,
  real,
  boolean,
  pgEnum,
} from "drizzle-orm/pg-core";

// Enums
export const RoleEnum = pgEnum("Role", ["user", "admin"]);
export const BookingStatusEnum = pgEnum("BookingStatus", ["Pending", "Confirmed", "Cancelled"]);
export const PaymentStatusEnum = pgEnum("PaymentStatus", ["Pending", "Completed", "Failed"]);
export const TicketStatusEnum = pgEnum("TicketStatus", ["Open", "Resolved"]);

// Tables

export const Users = pgTable("Users", {
  UserId: serial("UserId").primaryKey(),
  FirstName: varchar("FirstName", { length: 100 }),
  LastName: varchar("LastName", { length: 100 }),
  Email: varchar("Email", { length: 255 }).unique(),
  Password: varchar("Password", { length: 255 }),
  ContactPhone: varchar("ContactPhone", { length: 20 }),
  Address: text("Address"),
  Role: RoleEnum("Role").default("user"),
  CreatedAt: timestamp("CreatedAt").defaultNow(),
  UpdatedAt: timestamp("UpdatedAt").defaultNow(),
});

export const Hotels = pgTable("Hotels", {
  HotelId: serial("HotelId").primaryKey(),
  Name: varchar("Name", { length: 255 }),
  Location: varchar("Location", { length: 255 }),
  Address: text("Address"),
  ContactPhone: varchar("ContactPhone", { length: 20 }),
  Category: varchar("Category", { length: 100 }),
  Rating: real("Rating"),
  CreatedAt: timestamp("CreatedAt").defaultNow(),
  UpdatedAt: timestamp("UpdatedAt").defaultNow(),
});

export const Rooms = pgTable("Rooms", {
  RoomId: serial("RoomId").primaryKey(),
  HotelId: integer("HotelId").references(() => Hotels.HotelId),
  RoomType: varchar("RoomType", { length: 100 }),
  PricePerNight: real("PricePerNight"),
  Capacity: integer("Capacity"),
  Amenities: text("Amenities"),
  IsAvailable: boolean("IsAvailable").default(true),
  CreatedAt: timestamp("CreatedAt").defaultNow(),
});

export const Bookings = pgTable("Bookings", {
  BookingId: serial("BookingId").primaryKey(),
  UserId: integer("UserId").references(() => Users.UserId),
  RoomId: integer("RoomId").references(() => Rooms.RoomId),
  CheckInDate: timestamp("CheckInDate"),
  CheckOutDate: timestamp("CheckOutDate"),
  TotalAmount: real("TotalAmount"),
  BookingStatus: BookingStatusEnum("BookingStatus").default("Pending"),
  CreatedAt: timestamp("CreatedAt").defaultNow(),
  UpdatedAt: timestamp("UpdatedAt").defaultNow(),
});

export const Payments = pgTable("Payments", {
  PaymentId: serial("PaymentId").primaryKey(),
  BookingId: integer("BookingId").references(() => Bookings.BookingId),
  Amount: real("Amount"),
  PaymentStatus: PaymentStatusEnum("PaymentStatus").default("Pending"),
  PaymentDate: timestamp("PaymentDate").defaultNow(),
  PaymentMethod: varchar("PaymentMethod", { length: 100 }),
  TransactionId: varchar("TransactionId", { length: 255 }),
  CreatedAt: timestamp("CreatedAt").defaultNow(),
  UpdatedAt: timestamp("UpdatedAt").defaultNow(),
});

export const CustomerSupportTickets = pgTable("CustomerSupportTickets", {
  TicketId: serial("TicketId").primaryKey(),
  UserId: integer("UserId").references(() => Users.UserId),
  Subject: varchar("Subject", { length: 255 }),
  Description: text("Description"),
  Status: TicketStatusEnum("Status").default("Open"),
  CreatedAt: timestamp("CreatedAt").defaultNow(),
  UpdatedAt: timestamp("UpdatedAt").defaultNow(),
});


//Relationships.

export const UserToBookings = {
  one: Users.UserId,
  many: Bookings.UserId,
};


export const UserToTickets = {
  one: Users.UserId,
  many: CustomerSupportTickets.UserId,
};



export const HotelToRooms = {
  one: Hotels.HotelId,
  many: Rooms.HotelId,
};



export const RoomToBookings = {
  one: Rooms.RoomId,
  many: Bookings.RoomId,
};



export const BookingToPayment = {
  one: Bookings.BookingId,
  oneToOne: Payments.BookingId,
};

