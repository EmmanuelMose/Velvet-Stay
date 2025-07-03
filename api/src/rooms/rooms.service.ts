import { eq } from "drizzle-orm";
import  db  from "../Drizzle/db";
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

// Update Room
export const updateRoomService = async (id: number, updateData: any) => {
  await db.update(rooms).set({ ...updateData }).where(eq(rooms.roomId, id));
  return "Room updated successfully";
};

// Delete Room
export const deleteRoomService = async (id: number) => {
  await db.delete(rooms).where(eq(rooms.roomId, id)).returning();
  return "Room deleted successfully";
};
