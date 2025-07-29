import { eq } from "drizzle-orm";
import db from "../Drizzle/db";
import { users } from "../Drizzle/schema";
// Create User
export const createUserService = async (user) => {
    const [inserted] = await db.insert(users).values(user).returning();
    return inserted ?? null;
};
// Get All Users
export const getAllUsersService = async () => {
    const allUsers = await db.select().from(users);
    return allUsers;
};
// Get User by ID
export const getUserByIdService = async (id) => {
    const [user] = await db.select().from(users).where(eq(users.userId, id));
    return user ?? null;
};
// Update User
export const updateUserService = async (id, updateData) => {
    await db.update(users).set({ ...updateData, updatedAt: new Date() }).where(eq(users.userId, id));
    return "User updated successfully";
};
// Delete User
export const deleteUserService = async (id) => {
    await db.delete(users).where(eq(users.userId, id)).returning();
    return "User deleted successfully";
};
