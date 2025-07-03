import { eq } from "drizzle-orm";
import  db  from "../Drizzle/db";
import { hotels } from "../Drizzle/schema";

// Create Hotel
export const createHotelService = async (hotel: any) => {
  const [inserted] = await db.insert(hotels).values(hotel).returning();
  return inserted ?? null;
};

// Get All Hotels
export const getAllHotelsService = async () => {
  const allHotels = await db.select().from(hotels);
  return allHotels;
};

// Get Hotel by ID
export const getHotelByIdService = async (id: number) => {
  const [hotel] = await db.select().from(hotels).where(eq(hotels.hotelId, id));
  return hotel ?? null;
};

// Update Hotel
export const updateHotelService = async (id: number, updateData: any) => {
  await db.update(hotels).set({ ...updateData, updatedAt: new Date() }).where(eq(hotels.hotelId, id));
  return "Hotel updated successfully";
};

// Delete Hotel
export const deleteHotelService = async (id: number) => {
  await db.delete(hotels).where(eq(hotels.hotelId, id)).returning();
  return "Hotel deleted successfully";
};
