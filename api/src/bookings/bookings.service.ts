
import { eq } from "drizzle-orm";
import db from "../Drizzle/db";
import { bookings } from "../Drizzle/schema";
import { rooms } from "../Drizzle/schema"


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
  const allBookings = await db.select().from(bookings);
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