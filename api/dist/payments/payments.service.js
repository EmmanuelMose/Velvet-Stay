// payments.service.ts
import { eq } from "drizzle-orm";
import db from "../Drizzle/db.js";
import { payments } from "../Drizzle/schema.js";
import { and, gte, lt } from "drizzle-orm";
export const createPaymentService = async (payment) => {
    const [inserted] = await db.insert(payments).values(payment).returning();
    return inserted ?? null;
};
export const getAllPaymentsService = async () => {
    const allPayments = await db.select().from(payments);
    return allPayments;
};
export const getPaymentByIdService = async (id) => {
    const [payment] = await db.select().from(payments).where(eq(payments.paymentId, id));
    return payment ?? null;
};
export const updatePaymentService = async (id, updateData) => {
    await db.update(payments).set({ ...updateData, updatedAt: new Date() }).where(eq(payments.paymentId, id));
    return "Payment updated successfully";
};
export const deletePaymentService = async (id) => {
    await db.delete(payments).where(eq(payments.paymentId, id)).returning();
    return "Payment deleted successfully";
};
export const getPaymentsByDateService = async (date) => {
    const selectedDate = new Date(date);
    const nextDate = new Date(selectedDate);
    nextDate.setDate(selectedDate.getDate() + 1); // Next day for range filtering
    const result = await db
        .select()
        .from(payments)
        .where(and(gte(payments.paymentDate, selectedDate), lt(payments.paymentDate, nextDate)));
    return result;
};
