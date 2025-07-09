import { eq } from "drizzle-orm";
import db from "../Drizzle/db";
import { rooms } from "../Drizzle/schema";

// Create Room
export const createRoomService = async (room: any) => {
  const [inserted] = await db.insert(rooms).values(room).returning();
  return inserted ?? null;
};

// Get All Rooms
export const getAllRoomsService = async () => {
  const allRooms = await db.select().from(rooms);
  return allRooms;
};

// Get Room by ID
export const getRoomByIdService = async (id: number) => {
  const [room] = await db.select().from(rooms).where(eq(rooms.roomId, id));
  return room ?? null;
};

// Update Room (Fixed .toISOString issue)
export const updateRoomService = async (id: number, updateData: any) => {
  const { createdAt, updatedAt, ...safeUpdateData } = updateData;  // Remove unwanted fields

  await db.update(rooms)
    .set({
      ...safeUpdateData,
      updatedAt: new Date()  // Always use fresh Date object
    })
    .where(eq(rooms.roomId, id));

  return "Room updated successfully";
};

// Delete Room
export const deleteRoomService = async (id: number) => {
  await db.delete(rooms).where(eq(rooms.roomId, id)).returning();
  return "Room deleted successfully";
};
