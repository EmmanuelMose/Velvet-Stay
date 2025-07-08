import {
  createUserService,
  getAllUsersService,
  getUserByIdService,
  updateUserService,
  deleteUserService
} from "../../src/users/users.service";

import db from "../../src/Drizzle/db";
import { users } from "../../src/Drizzle/schema";

jest.mock("../../src/Drizzle/db", () => ({
  __esModule: true,
  default: {
    insert: jest.fn(),
    select: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
}));

describe("Users Service", () => {
  const mockUser = {
    userId: 1,
    username: "john_doe",
    email: "john@example.com",
    password: "hashedpassword",
    role: "User",
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should create a user", async () => {
    const returning = jest.fn().mockResolvedValue([mockUser]);
    (db.insert as jest.Mock).mockReturnValue({
      values: () => ({ returning }),
    });

    const result = await createUserService(mockUser);
    expect(result).toEqual(mockUser);
    expect(db.insert).toHaveBeenCalledWith(users);
  });

  it("should get all users", async () => {
    (db.select as jest.Mock).mockReturnValue({
      from: jest.fn().mockResolvedValue([mockUser]),
    });

    const result = await getAllUsersService();
    expect(result).toEqual([mockUser]);
  });

  it("should get user by ID", async () => {
    const where = jest.fn().mockResolvedValue([mockUser]);
    const from = () => ({ where });

    (db.select as jest.Mock).mockReturnValue({ from });

    const result = await getUserByIdService(1);
    expect(result).toEqual(mockUser);
  });

  it("should update a user", async () => {
    const set = jest.fn().mockReturnValue({
      where: jest.fn().mockResolvedValue({}),
    });

    (db.update as jest.Mock).mockReturnValue({ set });

    const result = await updateUserService(1, { username: "new_name" });
    expect(result).toBe("User updated successfully");
  });

  it("should delete a user", async () => {
    const where = jest.fn().mockReturnValue({
      returning: jest.fn().mockResolvedValue([mockUser]),
    });

    (db.delete as jest.Mock).mockReturnValue({ where });

    const result = await deleteUserService(1);
    expect(result).toBe("User deleted successfully");
  });
});
