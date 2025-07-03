"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../Drizzle/db"));
const schema_1 = require("../Drizzle/schema");
async function seed() {
    try {
        console.log("Seeding database...");
        // USERS
        const users = await db_1.default.insert(schema_1.Users).values([
            {
                FirstName: "Alice",
                LastName: "Smith",
                Email: "alice@example.com",
                Password: "hashedpassword1",
                ContactPhone: "0712345678",
                Address: "Nairobi",
                Role: "user"
            },
            {
                FirstName: "Bob",
                LastName: "Johnson",
                Email: "bob@example.com",
                Password: "hashedpassword2",
                ContactPhone: "0722334455",
                Address: "Mombasa",
                Role: "admin"
            },
            {
                FirstName: "Carol",
                LastName: "Brown",
                Email: "carol@example.com",
                Password: "hashedpassword3",
                ContactPhone: "0733445566",
                Address: "Kisumu",
                Role: "user"
            },
            {
                FirstName: "David",
                LastName: "Lee",
                Email: "david@example.com",
                Password: "hashedpassword4",
                ContactPhone: "0744556677",
                Address: "Nakuru",
                Role: "user"
            },
            {
                FirstName: "Eve",
                LastName: "Davis",
                Email: "eve@example.com",
                Password: "hashedpassword5",
                ContactPhone: "0755667788",
                Address: "Eldoret",
                Role: "user"
            }
        ]).returning();
        // HOTELS
        const hotels = await db_1.default.insert(schema_1.Hotels).values([
            {
                Name: "Ocean View Hotel",
                Location: "Mombasa",
                Address: "Beach Road",
                ContactPhone: "0700111222",
                Category: "Luxury",
                Rating: 4.8
            },
            {
                Name: "Mountain Breeze",
                Location: "Nyeri",
                Address: "Hill Lane",
                ContactPhone: "0711223344",
                Category: "Standard",
                Rating: 4.2
            },
            {
                Name: "City Inn",
                Location: "Nairobi",
                Address: "CBD",
                ContactPhone: "0722334455",
                Category: "Budget",
                Rating: 3.9
            },
            {
                Name: "Sunset Retreat",
                Location: "Naivasha",
                Address: "Lakeview Estate",
                ContactPhone: "0733445566",
                Category: "Luxury",
                Rating: 4.5
            },
            {
                Name: "Green Paradise",
                Location: "Kericho",
                Address: "Tea Gardens",
                ContactPhone: "0744556677",
                Category: "Eco",
                Rating: 4.6
            }
        ]).returning();
        // ROOMS
        const rooms = await db_1.default.insert(schema_1.Rooms).values([
            {
                HotelId: hotels[0].HotelId,
                RoomType: "Single",
                PricePerNight: 5000,
                Capacity: 1,
                Amenities: "WiFi, AC",
                IsAvailable: true
            },
            {
                HotelId: hotels[1].HotelId,
                RoomType: "Double",
                PricePerNight: 7000,
                Capacity: 2,
                Amenities: "WiFi, AC, TV",
                IsAvailable: true
            },
            {
                HotelId: hotels[2].HotelId,
                RoomType: "Suite",
                PricePerNight: 12000,
                Capacity: 3,
                Amenities: "WiFi, AC, TV, Bathtub",
                IsAvailable: false
            },
            {
                HotelId: hotels[3].HotelId,
                RoomType: "Twin",
                PricePerNight: 6000,
                Capacity: 2,
                Amenities: "WiFi, Fan",
                IsAvailable: true
            },
            {
                HotelId: hotels[4].HotelId,
                RoomType: "King",
                PricePerNight: 15000,
                Capacity: 4,
                Amenities: "WiFi, AC, Pool Access",
                IsAvailable: true
            }
        ]).returning();
        // BOOKINGS
        const bookings = await db_1.default.insert(schema_1.Bookings).values([
            {
                UserId: users[0].UserId,
                RoomId: rooms[0].RoomId,
                CheckInDate: new Date("2025-07-10"),
                CheckOutDate: new Date("2025-07-15"),
                TotalAmount: 25000,
                BookingStatus: "Confirmed"
            },
            {
                UserId: users[1].UserId,
                RoomId: rooms[1].RoomId,
                CheckInDate: new Date("2025-07-12"),
                CheckOutDate: new Date("2025-07-14"),
                TotalAmount: 14000,
                BookingStatus: "Pending"
            },
            {
                UserId: users[2].UserId,
                RoomId: rooms[2].RoomId,
                CheckInDate: new Date("2025-08-01"),
                CheckOutDate: new Date("2025-08-03"),
                TotalAmount: 24000,
                BookingStatus: "Cancelled"
            },
            {
                UserId: users[3].UserId,
                RoomId: rooms[3].RoomId,
                CheckInDate: new Date("2025-07-20"),
                CheckOutDate: new Date("2025-07-22"),
                TotalAmount: 12000,
                BookingStatus: "Confirmed"
            },
            {
                UserId: users[4].UserId,
                RoomId: rooms[4].RoomId,
                CheckInDate: new Date("2025-09-10"),
                CheckOutDate: new Date("2025-09-15"),
                TotalAmount: 75000,
                BookingStatus: "Confirmed"
            }
        ]).returning();
        // PAYMENTS
        await db_1.default.insert(schema_1.Payments).values([
            {
                BookingId: bookings[0].BookingId,
                Amount: 25000,
                PaymentStatus: "Completed",
                PaymentMethod: "M-Pesa",
                TransactionId: "TXN1001"
            },
            {
                BookingId: bookings[1].BookingId,
                Amount: 14000,
                PaymentStatus: "Pending",
                PaymentMethod: "Card",
                TransactionId: "TXN1002"
            },
            {
                BookingId: bookings[2].BookingId,
                Amount: 24000,
                PaymentStatus: "Failed",
                PaymentMethod: "Bank Transfer",
                TransactionId: "TXN1003"
            },
            {
                BookingId: bookings[3].BookingId,
                Amount: 12000,
                PaymentStatus: "Completed",
                PaymentMethod: "Cash",
                TransactionId: "TXN1004"
            },
            {
                BookingId: bookings[4].BookingId,
                Amount: 75000,
                PaymentStatus: "Completed",
                PaymentMethod: "M-Pesa",
                TransactionId: "TXN1005"
            }
        ]);
        // CUSTOMER SUPPORT TICKETS
        await db_1.default.insert(schema_1.CustomerSupportTickets).values([
            {
                UserId: users[0].UserId,
                Subject: "Late check-in issue",
                Description: "Room wasn't ready by 3 PM",
                Status: "Open"
            },
            {
                UserId: users[1].UserId,
                Subject: "Payment failed",
                Description: "Card transaction didn't go through",
                Status: "Resolved"
            },
            {
                UserId: users[2].UserId,
                Subject: "WiFi not working",
                Description: "Internet was down in room 203",
                Status: "Open"
            },
            {
                UserId: users[3].UserId,
                Subject: "Room not cleaned",
                Description: "The room was not cleaned on day 2",
                Status: "Resolved"
            },
            {
                UserId: users[4].UserId,
                Subject: "No hot water",
                Description: "Hot water system not functioning",
                Status: "Open"
            }
        ]);
        console.log("Seeding completed.");
    }
    catch (error) {
        console.error("Seeding failed:", error);
    }
}
seed();
