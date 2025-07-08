
import { eq } from "drizzle-orm";
import db from "../Drizzle/db";
import { bookings } from "../Drizzle/schema";

export const createBookingService = async (booking: any) => {
  const [inserted] = await db.insert(bookings).values(booking).returning();
  return inserted ?? null;
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