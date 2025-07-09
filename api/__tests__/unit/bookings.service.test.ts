

import { createBookingService, getAllBookingsService, getBookingByIdService, updateBookingService, deleteBookingService } from "../../src/bookings/bookings.service";
import db from "../../src/Drizzle/db";
import { bookings } from "../../src/Drizzle/schema";


// Mock the entire db module
jest.mock("../../src/Drizzle/db", () => ({
  insert: jest.fn(),
  select: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
}));

describe("Bookings Service", () => {
  const mockBooking = {
    bookingId: 1,
    userId: 1,
    roomId: 101,
    checkInDate: new Date("2025-07-10"),
    checkOutDate: new Date("2025-07-15"),
    totalAmount: 500,
    bookingStatus: "Pending",
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should create a booking", async () => {
    const returning = jest.fn().mockResolvedValue([mockBooking]);
    (db.insert as jest.Mock).mockReturnValue({ values: jest.fn().mockReturnValue({ returning }) });

    const result = await createBookingService(mockBooking);
    expect(result).toEqual(mockBooking);
    expect(db.insert).toHaveBeenCalledWith(bookings);
  });

  it("should get all bookings", async () => {
    (db.select as jest.Mock).mockReturnValue({ from: jest.fn().mockResolvedValue([mockBooking]) });

    const result = await getAllBookingsService();
    expect(result).toEqual([mockBooking]);
    expect(db.select).toHaveBeenCalled();
  });

  it("should get booking by ID", async () => {
  const where = jest.fn().mockResolvedValue([mockBooking]);  
  const from = jest.fn().mockReturnValue({ where });         

  (db.select as jest.Mock).mockReturnValue({ from });

  const result = await getBookingByIdService(1);
  expect(result).toEqual(mockBooking);
  expect(db.select).toHaveBeenCalled();
});


  it("should update a booking", async () => {
    const set = jest.fn().mockReturnValue({ where: jest.fn() });
    (db.update as jest.Mock).mockReturnValue({ set });

    const result = await updateBookingService(1, { bookingStatus: "Confirmed" });
    expect(result).toBe("Booking updated successfully");
    expect(db.update).toHaveBeenCalledWith(bookings);
  });

  it("should delete a booking", async () => {
    const where = jest.fn().mockReturnValue({ returning: jest.fn() });
    (db.delete as jest.Mock).mockReturnValue({ where });

    const result = await deleteBookingService(1);
    expect(result).toBe("Booking deleted successfully");
    expect(db.delete).toHaveBeenCalledWith(bookings);
  });
});
