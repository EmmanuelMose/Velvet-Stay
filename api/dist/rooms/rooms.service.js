import { eq } from "drizzle-orm";
import db from "../Drizzle/db.js";
import { rooms } from "../Drizzle/schema.js";
//Create Room
export const createRoomService = async (room) => {
    const [inserted] = await db.insert(rooms).values(room).returning();
    return inserted ?? null;
};
//Get All Rooms
export const getAllRoomsService = async () => {
    const allRooms = await db.select().from(rooms);
    return allRooms;
};
//Get Room by ID
export const getRoomByIdService = async (id) => {
    const [room] = await db.select().from(rooms).where(eq(rooms.roomId, id));
    return room ?? null;
};
//Update Room (safe update)
export const updateRoomService = async (id, updateData) => {
    const { createdAt, updatedAt, ...safeUpdateData } = updateData;
    await db.update(rooms)
        .set({
        ...safeUpdateData,
        updatedAt: new Date()
    })
        .where(eq(rooms.roomId, id));
    return "Room updated successfully";
};
//Delete Room
export const deleteRoomService = async (id) => {
    await db.delete(rooms).where(eq(rooms.roomId, id)).returning();
    return "Room deleted successfully";
};
// Get All Rooms by Hotel ID
export const getRoomsByHotelIdService = async (hotelId) => {
    const allRooms = await db
        .select()
        .from(rooms)
        .where(eq(rooms.hotelId, hotelId));
    return allRooms;
};
