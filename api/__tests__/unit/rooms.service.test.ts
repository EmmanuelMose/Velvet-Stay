import {
  createRoomService,
  getAllRoomsService,
  getRoomByIdService,
  updateRoomService,
  deleteRoomService
} from "../../src/rooms/rooms.service";

import db from "../../src/Drizzle/db";
import { rooms } from "../../src/Drizzle/schema";

// Mock the db module
jest.mock("../../src/Drizzle/db", () => ({
  insert: jest.fn(),
  select: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
}));

describe("Rooms Service", () => {
  const mockRoom = {
    roomId: 1,
    hotelId: 1,
    roomNumber: "A101",
    roomType: "Deluxe",
    pricePerNight: 150,
    isAvailable: true,
    description: "Spacious room with sea view",
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should create a room", async () => {
    const returning = jest.fn().mockResolvedValue([mockRoom]);
    (db.insert as jest.Mock).mockReturnValue({
      values: jest.fn().mockReturnValue({ returning }),
    });

    const result = await createRoomService(mockRoom);
    expect(result).toEqual(mockRoom);
    expect(db.insert).toHaveBeenCalledWith(rooms);
  });

  it("should get all rooms", async () => {
    const from = jest.fn().mockResolvedValue([mockRoom]);
    (db.select as jest.Mock).mockReturnValue({ from });

    const result = await getAllRoomsService();
    expect(result).toEqual([mockRoom]);
    expect(db.select).toHaveBeenCalled();
  });

  it("should get room by ID", async () => {
    const from = jest.fn().mockResolvedValue([mockRoom]);
    (db.select as jest.Mock).mockReturnValue({
      from,
      where: () => from(),
    });

    const result = await getRoomByIdService(1);
    expect(result).toEqual(mockRoom);
    expect(db.select).toHaveBeenCalled();
  });

  it("should update a room", async () => {
    const where = jest.fn();
    const set = jest.fn().mockReturnValue({ where });
    (db.update as jest.Mock).mockReturnValue({ set });

    const result = await updateRoomService(1, { pricePerNight: 200 });
    expect(result).toBe("Room updated successfully");
    expect(db.update).toHaveBeenCalledWith(rooms);
  });

  it("should delete a room", async () => {
    const returning = jest.fn();
    const where = jest.fn().mockReturnValue({ returning });
    (db.delete as jest.Mock).mockReturnValue({ where });

    const result = await deleteRoomService(1);
    expect(result).toBe("Room deleted successfully");
    expect(db.delete).toHaveBeenCalledWith(rooms);
  });
});
