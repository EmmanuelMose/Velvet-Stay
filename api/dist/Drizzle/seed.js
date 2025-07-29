import db from "../Drizzle/db.js";
import { users, hotels, rooms, bookings, payments, customerSupportTickets, } from "../Drizzle/schema.js";
async function seed() {
    try {
        console.log("Seeding database...");
        // USERS
        const userData = await db.insert(users).values([
            { firstName: "Grace", lastName: "Wanjiku", email: "grace@hostelhub.com", password: "pass123grace", contactPhone: "0700100000", address: "Thika", role: "Admin" },
            { firstName: "Kevin", lastName: "Otieno", email: "kevin@guestplace.com", password: "pass123kevin", contactPhone: "0711100000", address: "Kakamega", role: "User" },
            { firstName: "Lucy", lastName: "Mwangi", email: "lucy@coastresort.com", password: "pass123lucy", contactPhone: "0722200000", address: "Malindi", role: "User" },
            { firstName: "Tom", lastName: "Okoth", email: "tom@mountaininn.com", password: "pass123tom", contactPhone: "0733300000", address: "Embu", role: "User" },
            { firstName: "Faith", lastName: "Chebet", email: "faith@sunview.com", password: "pass123faith", contactPhone: "0744400000", address: "Kitale", role: "User" },
        ]).returning();
        // HOTELS
        const hotelData = await db.insert(hotels).values([
            { name: "Safari Lodge", location: "Nanyuki", address: "Wildlife Rd", contactPhone: "0711223344", category: "Safari", rating: 4.7, imgUrl: "https://example.com/safari.jpg", description: "Adventure in the wild." },
            { name: "Serenity Suites", location: "Kisumu", address: "Lakeview St", contactPhone: "0722334455", category: "Business", rating: 4.1, imgUrl: "https://example.com/serenity.jpg", description: "Relax and work in comfort." },
            { name: "Royal Palms", location: "Diani", address: "Beachfront Ave", contactPhone: "0733445566", category: "Luxury", rating: 4.9, imgUrl: "https://example.com/royal.jpg", description: "Luxury at the coast." },
            { name: "Uptown Haven", location: "Nairobi", address: "Westlands", contactPhone: "0744556677", category: "Urban", rating: 3.8, imgUrl: "https://example.com/uptown.jpg", description: "Heart of the city stay." },
            { name: "Green Leaf Resort", location: "Kerugoya", address: "Tea Hills", contactPhone: "0755667788", category: "Eco", rating: 4.3, imgUrl: "https://example.com/greenleaf.jpg", description: "Eco-friendly hillside resort." },
        ]).returning();
        // ROOMS
        const roomData = await db.insert(rooms).values([
            { hotelId: hotelData[0].hotelId, roomType: "Deluxe", pricePerNight: 8000, capacity: 2, amenities: "WiFi, Balcony", isAvailable: true },
            { hotelId: hotelData[1].hotelId, roomType: "Standard", pricePerNight: 4500, capacity: 2, amenities: "WiFi, TV", isAvailable: true },
            { hotelId: hotelData[2].hotelId, roomType: "Ocean View", pricePerNight: 10000, capacity: 3, amenities: "AC, TV, Mini Bar", isAvailable: false },
            { hotelId: hotelData[3].hotelId, roomType: "Business Suite", pricePerNight: 7000, capacity: 2, amenities: "WiFi, Workspace", isAvailable: true },
            { hotelId: hotelData[4].hotelId, roomType: "Family", pricePerNight: 9000, capacity: 4, amenities: "WiFi, Kitchen", isAvailable: true },
        ]).returning();
        // BOOKINGS
        const bookingData = await db.insert(bookings).values([
            { userId: userData[0].userId, roomId: roomData[0].roomId, checkInDate: new Date("2025-08-01"), checkOutDate: new Date("2025-08-05"), totalAmount: 32000, bookingStatus: "Confirmed" },
            { userId: userData[1].userId, roomId: roomData[1].roomId, checkInDate: new Date("2025-08-10"), checkOutDate: new Date("2025-08-12"), totalAmount: 9000, bookingStatus: "Pending" },
            { userId: userData[2].userId, roomId: roomData[2].roomId, checkInDate: new Date("2025-09-01"), checkOutDate: new Date("2025-09-03"), totalAmount: 20000, bookingStatus: "Cancelled" },
            { userId: userData[3].userId, roomId: roomData[3].roomId, checkInDate: new Date("2025-07-28"), checkOutDate: new Date("2025-07-30"), totalAmount: 14000, bookingStatus: "Confirmed" },
            { userId: userData[4].userId, roomId: roomData[4].roomId, checkInDate: new Date("2025-10-10"), checkOutDate: new Date("2025-10-15"), totalAmount: 45000, bookingStatus: "Confirmed" },
        ]).returning();
        // PAYMENTS
        await db.insert(payments).values([
            { bookingId: bookingData[0].bookingId, amount: 32000, paymentStatus: "Completed", paymentMethod: "M-Pesa", transactionId: "TXN2001" },
            { bookingId: bookingData[1].bookingId, amount: 9000, paymentStatus: "Pending", paymentMethod: "Card", transactionId: "TXN2002" },
            { bookingId: bookingData[2].bookingId, amount: 20000, paymentStatus: "Failed", paymentMethod: "Bank Transfer", transactionId: "TXN2003" },
            { bookingId: bookingData[3].bookingId, amount: 14000, paymentStatus: "Completed", paymentMethod: "Cash", transactionId: "TXN2004" },
            { bookingId: bookingData[4].bookingId, amount: 45000, paymentStatus: "Completed", paymentMethod: "M-Pesa", transactionId: "TXN2005" },
        ]);
        // CUSTOMER SUPPORT TICKETS
        await db.insert(customerSupportTickets).values([
            { userId: userData[0].userId, subject: "Key not working", description: "Card key isn't opening room door.", status: "Open" },
            { userId: userData[1].userId, subject: "Overcharge", description: "Charged extra on card.", status: "Resolved" },
            { userId: userData[2].userId, subject: "No toiletries", description: "Room lacked essential toiletries.", status: "Open" },
            { userId: userData[3].userId, subject: "Noisy neighbors", description: "Disturbance from adjacent room.", status: "Resolved" },
            { userId: userData[4].userId, subject: "WiFi down", description: "Internet not working in lobby.", status: "Open" },
        ]);
        console.log("Seeding completed.");
    }
    catch (error) {
        console.error("Seeding failed:", error);
    }
}
seed();
