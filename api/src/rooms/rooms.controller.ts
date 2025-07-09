import { Request, Response } from "express";
import {
  createRoomService,
  getAllRoomsService,
  getRoomByIdService,
  updateRoomService,
  deleteRoomService
} from "../rooms/rooms.service";

// Create Room Controller
export const createRoomController = async (req: Request, res: Response) => {
  try {
    const room = req.body;
    const newRoom = await createRoomService(room);
    if (!newRoom) {
      return res.status(400).json({ message: "Room not created" });
    }
    return res.status(201).json({ message: "Room created successfully", room: newRoom });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

// Get All Rooms Controller
export const getAllRoomsController = async (req: Request, res: Response) => {
  try {
    const rooms = await getAllRoomsService();
    if (!rooms || rooms.length === 0) {
      return res.status(404).json({ message: "No rooms found" });
    }
    return res.status(200).json({ data: rooms });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

// Get Room by ID Controller
export const getRoomByIdController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid Room ID" });
    }
    const room = await getRoomByIdService(id);
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }
    return res.status(200).json({ data: room });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

// Update Room Controller
export const updateRoomController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid Room ID" });
    }

    const existingRoom = await getRoomByIdService(id);
    if (!existingRoom) {
      return res.status(404).json({ message: "Room not found" });
    }

    const updated = await updateRoomService(id, req.body);
    return res.status(200).json({ message: updated });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

// Delete Room Controller
export const deleteRoomController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid Room ID" });
    }

    const existingRoom = await getRoomByIdService(id);
    if (!existingRoom) {
      return res.status(404).json({ message: "Room not found" });
    }

    const deleted = await deleteRoomService(id);
    return res.status(202).json({ message: deleted });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
