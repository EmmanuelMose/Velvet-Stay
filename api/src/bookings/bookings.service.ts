
import { eq } from "drizzle-orm";
import db from "../Drizzle/db.js";
import { bookings } from "../Drizzle/schema.js";
import {hotels, rooms } from "../Drizzle/schema"


export const createBookingService = async (booking:any) => {
const newBooking = await db.insert(bookings).values(booking).returning();
// Mark room as unavailable
  if (booking.roomId) {
    await db
      .update(rooms)
      .set({ isAvailable: false })
      .where(eq(rooms.roomId, booking.roomId));
  }
return newBooking 
};

export const getAllBookingsService = async () => {
  const allBookings = await db
    .select({
      bookingId: bookings.bookingId,
      userId: bookings.userId,
      roomId: bookings.roomId,
      checkInDate: bookings.checkInDate,
      checkOutDate: bookings.checkOutDate,
      totalAmount: bookings.totalAmount,
      bookingStatus: bookings.bookingStatus,
      createdAt: bookings.createdAt,
      hotelName: hotels.name,
      hotelLocation: hotels.location,
    })
    .from(bookings)
    .leftJoin(rooms, eq(bookings.roomId, rooms.roomId))
    .leftJoin(hotels, eq(rooms.hotelId, hotels.hotelId));

  return allBookings;
};

export const getBookingByIdService = async (id: number) => {
  const [booking] = await db.select().from(bookings).where(eq(bookings.bookingId, id));
  return booking ?? null;
};

export const updateBookingService = async (id: number, updateData: any) => {
  await db.update(bookings).set({ ...updateData, updatedAt: new Date() }).where(eq(bookings.bookingId, id));
  return "Booking updated successfully";
};

export const deleteBookingService = async (id: number) => {
  await db.delete(bookings).where(eq(bookings.bookingId, id)).returning();
  return "Booking deleted successfully";
};

export const updateBookingStatusService = async (bookingId: number, status: "Pending" | "Confirmed" | "Cancelled") => {
  const updated = await db
    .update(bookings)
    .set({ bookingStatus: status })
    .where(eq(bookings.bookingId, bookingId))
    .returning();

  return updated[0]; // return the updated booking
};