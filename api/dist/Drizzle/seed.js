import db from "../Drizzle/db";
import { users, hotels, rooms, bookings, payments, customerSupportTickets, } from "../Drizzle/schema.js";
async function seed() {
    try {
        console.log("Seeding database...");
        // USERS
        const userData = await db.insert(users).values([
            { firstName: "Alice", lastName: "Smith", email: "alice@example.com", password: "hashedpassword1", contactPhone: "0712345678", address: "Nairobi", role: "User" },
            { firstName: "Bob", lastName: "Johnson", email: "bob@example.com", password: "hashedpassword2", contactPhone: "0722334455", address: "Mombasa", role: "Admin" },
            { firstName: "Carol", lastName: "Brown", email: "carol@example.com", password: "hashedpassword3", contactPhone: "0733445566", address: "Kisumu", role: "User" },
            { firstName: "David", lastName: "Lee", email: "david@example.com", password: "hashedpassword4", contactPhone: "0744556677", address: "Nakuru", role: "User" },
            { firstName: "Eve", lastName: "Davis", email: "eve@example.com", password: "hashedpassword5", contactPhone: "0755667788", address: "Eldoret", role: "User" },
        ]).returning();
        // HOTELS
        const hotelData = await db.insert(hotels).values([
            { name: "Ocean View Hotel", location: "Mombasa", address: "Beach Road", contactPhone: "0700111222", category: "Luxury", rating: 4.8 },
            { name: "Mountain Breeze", location: "Nyeri", address: "Hill Lane", contactPhone: "0711223344", category: "Standard", rating: 4.2 },
            { name: "City Inn", location: "Nairobi", address: "CBD", contactPhone: "0722334455", category: "Budget", rating: 3.9 },
            { name: "Sunset Retreat", location: "Naivasha", address: "Lakeview Estate", contactPhone: "0733445566", category: "Luxury", rating: 4.5 },
            { name: "Green Paradise", location: "Kericho", address: "Tea Gardens", contactPhone: "0744556677", category: "Eco", rating: 4.6 },
        ]).returning();
        // ROOMS
        const roomData = await db.insert(rooms).values([
            { hotelId: hotelData[0].hotelId, roomType: "Single", pricePerNight: 5000, capacity: 1, amenities: "WiFi, AC", isAvailable: true },
            { hotelId: hotelData[1].hotelId, roomType: "Double", pricePerNight: 7000, capacity: 2, amenities: "WiFi, AC, TV", isAvailable: true },
            { hotelId: hotelData[2].hotelId, roomType: "Suite", pricePerNight: 12000, capacity: 3, amenities: "WiFi, AC, TV, Bathtub", isAvailable: false },
            { hotelId: hotelData[3].hotelId, roomType: "Twin", pricePerNight: 6000, capacity: 2, amenities: "WiFi, Fan", isAvailable: true },
            { hotelId: hotelData[4].hotelId, roomType: "King", pricePerNight: 15000, capacity: 4, amenities: "WiFi, AC, Pool Access", isAvailable: true },
        ]).returning();
        // BOOKINGS
        const bookingData = await db.insert(bookings).values([
            { userId: userData[0].userId, roomId: roomData[0].roomId, checkInDate: new Date("2025-07-10"), checkOutDate: new Date("2025-07-15"), totalAmount: 25000, bookingStatus: "Confirmed" },
            { userId: userData[1].userId, roomId: roomData[1].roomId, checkInDate: new Date("2025-07-12"), checkOutDate: new Date("2025-07-14"), totalAmount: 14000, bookingStatus: "Pending" },
            { userId: userData[2].userId, roomId: roomData[2].roomId, checkInDate: new Date("2025-08-01"), checkOutDate: new Date("2025-08-03"), totalAmount: 24000, bookingStatus: "Cancelled" },
            { userId: userData[3].userId, roomId: roomData[3].roomId, checkInDate: new Date("2025-07-20"), checkOutDate: new Date("2025-07-22"), totalAmount: 12000, bookingStatus: "Confirmed" },
            { userId: userData[4].userId, roomId: roomData[4].roomId, checkInDate: new Date("2025-09-10"), checkOutDate: new Date("2025-09-15"), totalAmount: 75000, bookingStatus: "Confirmed" },
        ]).returning();
        // PAYMENTS
        await db.insert(payments).values([
            { bookingId: bookingData[0].bookingId, amount: 25000, paymentStatus: "Completed", paymentMethod: "M-Pesa", transactionId: "TXN1001" },
            { bookingId: bookingData[1].bookingId, amount: 14000, paymentStatus: "Pending", paymentMethod: "Card", transactionId: "TXN1002" },
            { bookingId: bookingData[2].bookingId, amount: 24000, paymentStatus: "Failed", paymentMethod: "Bank Transfer", transactionId: "TXN1003" },
            { bookingId: bookingData[3].bookingId, amount: 12000, paymentStatus: "Completed", paymentMethod: "Cash", transactionId: "TXN1004" },
            { bookingId: bookingData[4].bookingId, amount: 75000, paymentStatus: "Completed", paymentMethod: "M-Pesa", transactionId: "TXN1005" },
        ]);
        // CUSTOMER SUPPORT TICKETS
        await db.insert(customerSupportTickets).values([
            { userId: userData[0].userId, subject: "Late check-in issue", description: "Room wasn't ready by 3 PM", status: "Open" },
            { userId: userData[1].userId, subject: "Payment failed", description: "Card transaction didn't go through", status: "Resolved" },
            { userId: userData[2].userId, subject: "WiFi not working", description: "Internet was down in room 203", status: "Open" },
            { userId: userData[3].userId, subject: "Room not cleaned", description: "The room was not cleaned on day 2", status: "Resolved" },
            { userId: userData[4].userId, subject: "No hot water", description: "Hot water system not functioning", status: "Open" },
        ]);
        console.log("Seeding completed.");
    }
    catch (error) {
        console.error("Seeding failed:", error);
    }
}
seed();
