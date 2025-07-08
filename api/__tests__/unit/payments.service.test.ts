import {
  createPaymentService,
  getAllPaymentsService,
  getPaymentByIdService,
  updatePaymentService,
  deletePaymentService
} from "../../src/payments/payments.service";

import db from "../../src/Drizzle/db";
import { payments } from "../../src/Drizzle/schema";

// Mock db module
jest.mock("../../src/Drizzle/db", () => ({
  insert: jest.fn(),
  select: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
}));

describe("Payments Service", () => {
  const mockPayment = {
    paymentId: 1,
    bookingId: 100,
    amount: 250,
    paymentStatus: "Completed",
    paymentDate: new Date(),
    paymentMethod: "Credit Card",
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should create a payment", async () => {
    const returning = jest.fn().mockResolvedValue([mockPayment]);
    (db.insert as jest.Mock).mockReturnValue({
      values: jest.fn().mockReturnValue({ returning }),
    });

    const result = await createPaymentService(mockPayment);
    expect(result).toEqual(mockPayment);
    expect(db.insert).toHaveBeenCalledWith(payments);
  });

  it("should get all payments", async () => {
    const from = jest.fn().mockResolvedValue([mockPayment]);
    (db.select as jest.Mock).mockReturnValue({ from });

    const result = await getAllPaymentsService();
    expect(result).toEqual([mockPayment]);
    expect(db.select).toHaveBeenCalled();
  });

  it("should get payment by ID", async () => {
    const from = jest.fn().mockResolvedValue([mockPayment]);
    (db.select as jest.Mock).mockReturnValue({ from, where: () => from() });

    const result = await getPaymentByIdService(1);
    expect(result).toEqual(mockPayment);
    expect(db.select).toHaveBeenCalled();
  });

  it("should update a payment", async () => {
    const set = jest.fn().mockReturnValue({ where: jest.fn() });
    (db.update as jest.Mock).mockReturnValue({ set });

    const result = await updatePaymentService(1, { paymentStatus: "Pending" });
    expect(result).toBe("Payment updated successfully");
    expect(db.update).toHaveBeenCalledWith(payments);
  });

  it("should delete a payment", async () => {
    const where = jest.fn().mockReturnValue({ returning: jest.fn() });
    (db.delete as jest.Mock).mockReturnValue({ where });

    const result = await deletePaymentService(1);
    expect(result).toBe("Payment deleted successfully");
    expect(db.delete).toHaveBeenCalledWith(payments);
  });
});
