import {
  createCustomerSupportTicketService,
  getAllCustomerSupportTicketsService,
  getCustomerSupportTicketByIdService,
  updateCustomerSupportTicketService,
  deleteCustomerSupportTicketService
} from "../../src/customerSupportTickets/customerSupportTickets.service";

import db from "../../src/Drizzle/db";
import { customerSupportTickets } from "../../src/Drizzle/schema";

// Mock db module
jest.mock("../../src/Drizzle/db", () => ({
  insert: jest.fn(),
  select: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
}));

describe("Customer Support Tickets Service", () => {
  const mockTicket = {
    ticketId: 1,
    userId: 5,
    subject: "Unable to access booking",
    message: "I'm having trouble accessing my booking details.",
    status: "Open",
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should create a customer support ticket", async () => {
    const returning = jest.fn().mockResolvedValue([mockTicket]);
    (db.insert as jest.Mock).mockReturnValue({
      values: jest.fn().mockReturnValue({ returning }),
    });

    const result = await createCustomerSupportTicketService(mockTicket);
    expect(result).toEqual(mockTicket);
    expect(db.insert).toHaveBeenCalledWith(customerSupportTickets);
  });

  it("should get all customer support tickets", async () => {
    const from = jest.fn().mockResolvedValue([mockTicket]);
    (db.select as jest.Mock).mockReturnValue({ from });

    const result = await getAllCustomerSupportTicketsService();
    expect(result).toEqual([mockTicket]);
    expect(db.select).toHaveBeenCalled();
  });

  it("should get a customer support ticket by ID", async () => {
    const from = jest.fn().mockResolvedValue([mockTicket]);
    (db.select as jest.Mock).mockReturnValue({ from, where: () => from() });

    const result = await getCustomerSupportTicketByIdService(1);
    expect(result).toEqual(mockTicket);
    expect(db.select).toHaveBeenCalled();
  });

  it("should update a customer support ticket", async () => {
    const set = jest.fn().mockReturnValue({ where: jest.fn() });
    (db.update as jest.Mock).mockReturnValue({ set });

    const result = await updateCustomerSupportTicketService(1, { status: "Resolved" });
    expect(result).toBe("Ticket updated successfully");
    expect(db.update).toHaveBeenCalledWith(customerSupportTickets);
  });

  it("should delete a customer support ticket", async () => {
    const where = jest.fn().mockReturnValue({ returning: jest.fn() });
    (db.delete as jest.Mock).mockReturnValue({ where });

    const result = await deleteCustomerSupportTicketService(1);
    expect(result).toBe("Ticket deleted successfully");
    expect(db.delete).toHaveBeenCalledWith(customerSupportTickets);
  });
});
