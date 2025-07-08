import {
  createHotelService,
  getAllHotelsService,
  getHotelByIdService,
  updateHotelService,
  deleteHotelService
} from "../../src/hotels/hotels.service";

import db from "../../src/Drizzle/db";
import { hotels } from "../../src/Drizzle/schema";

// Properly Mock db module
jest.mock("../../src/Drizzle/db", () => ({
  insert: jest.fn(),
  select: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
}));

describe("Hotels Service", () => {
  const mockHotel = {
    hotelId: 1,
    name: "Sunrise Resort",
    location: "Mombasa",
    description: "A beautiful beachfront hotel.",
    rating: 4.5,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should create a hotel", async () => {
    const returning = jest.fn().mockResolvedValue([mockHotel]);
    const values = jest.fn().mockReturnValue({ returning });
    (db.insert as jest.Mock).mockReturnValue({ values });

    const result = await createHotelService(mockHotel);
    expect(result).toEqual(mockHotel);
    expect(db.insert).toHaveBeenCalledWith(hotels);
  });

  it("should get all hotels", async () => {
    const from = jest.fn().mockResolvedValue([mockHotel]);
    (db.select as jest.Mock).mockReturnValue({ from });

    const result = await getAllHotelsService();
    expect(result).toEqual([mockHotel]);
    expect(db.select).toHaveBeenCalled();
  });

  it("should get hotel by ID", async () => {
    const where = jest.fn().mockResolvedValue([mockHotel]);
    const from = jest.fn().mockReturnValue({ where });
    (db.select as jest.Mock).mockReturnValue({ from });

    const result = await getHotelByIdService(1);
    expect(result).toEqual(mockHotel);
    expect(db.select).toHaveBeenCalled();
  });

  it("should update a hotel", async () => {
    const where = jest.fn().mockReturnValue(Promise.resolve());
    const set = jest.fn().mockReturnValue({ where });
    (db.update as jest.Mock).mockReturnValue({ set });

    const result = await updateHotelService(1, { name: "New Hotel Name" });
    expect(result).toBe("Hotel updated successfully");
    expect(db.update).toHaveBeenCalledWith(hotels);
  });

  it("should delete a hotel", async () => {
    const where = jest.fn().mockReturnValue(Promise.resolve());
    (db.delete as jest.Mock).mockReturnValue({ where });

    const result = await deleteHotelService(1);
    expect(result).toBe("Hotel deleted successfully");
    expect(db.delete).toHaveBeenCalledWith(hotels);
  });
});
