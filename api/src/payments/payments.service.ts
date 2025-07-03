// payments.service.ts
import { eq } from "drizzle-orm";
import db from "../Drizzle/db";
import { payments } from "../Drizzle/schema";

export const createPaymentService = async (payment: any) => {
  const [inserted] = await db.insert(payments).values(payment).returning();
  return inserted ?? null;
};

export const getAllPaymentsService = async () => {
  const allPayments = await db.select().from(payments);
  return allPayments;
};

export const getPaymentByIdService = async (id: number) => {
  const [payment] = await db.select().from(payments).where(eq(payments.paymentId, id));
  return payment ?? null;
};

export const updatePaymentService = async (id: number, updateData: any) => {
  await db.update(payments).set({ ...updateData, updatedAt: new Date() }).where(eq(payments.paymentId, id));
  return "Payment updated successfully";
};

export const deletePaymentService = async (id: number) => {
  await db.delete(payments).where(eq(payments.paymentId, id)).returning();
  return "Payment deleted successfully";
};
