// customerSupportTickets.service.ts
import { eq } from "drizzle-orm";
import db from "../Drizzle/db";
import { customerSupportTickets } from "../Drizzle/schema";
export const createCustomerSupportTicketService = async (ticket) => {
    const [inserted] = await db.insert(customerSupportTickets).values(ticket).returning();
    return inserted ?? null;
};
export const getAllCustomerSupportTicketsService = async () => {
    const allTickets = await db.select().from(customerSupportTickets);
    return allTickets;
};
export const getCustomerSupportTicketByIdService = async (id) => {
    const [ticket] = await db.select().from(customerSupportTickets).where(eq(customerSupportTickets.ticketId, id));
    return ticket ?? null;
};
export const updateCustomerSupportTicketService = async (id, updateData) => {
    await db.update(customerSupportTickets)
        .set({ ...updateData, updatedAt: new Date() })
        .where(eq(customerSupportTickets.ticketId, id));
    return "Ticket updated successfully";
};
export const deleteCustomerSupportTicketService = async (id) => {
    await db.delete(customerSupportTickets).where(eq(customerSupportTickets.ticketId, id)).returning();
    return "Ticket deleted successfully";
};
