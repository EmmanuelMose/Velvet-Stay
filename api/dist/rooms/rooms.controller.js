import { createRoomService, getAllRoomsService, getRoomByIdService, updateRoomService, deleteRoomService, getRoomsByHotelIdService } from "../rooms/rooms.service";
// Create Room Controller
export const createRoomController = async (req, res) => {
    try {
        const room = req.body;
        const newRoom = await createRoomService(room);
        if (!newRoom) {
            return res.status(400).json({ message: "Room not created" });
        }
        return res.status(201).json({ message: "Room created successfully", room: newRoom });
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
// Get All Rooms Controller
export const getAllRoomsController = async (req, res) => {
    try {
        const rooms = await getAllRoomsService();
        if (!rooms || rooms.length === 0) {
            return res.status(404).json({ message: "No rooms found" });
        }
        return res.status(200).json(rooms);
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
// Get Room by ID Controller
export const getRoomByIdController = async (req, res) => {
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
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
// Update Room Controller
export const updateRoomController = async (req, res) => {
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
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
// Delete Room Controller
export const deleteRoomController = async (req, res) => {
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
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
// Get Rooms by Hotel ID (All Rooms)
export const getRoomsByHotelIdController = async (req, res) => {
    try {
        const hotelId = parseInt(req.params.hotelId);
        if (isNaN(hotelId)) {
            return res.status(400).json({ message: "Invalid hotel ID" });
        }
        const rooms = await getRoomsByHotelIdService(hotelId);
        if (!rooms || rooms.length === 0) {
            return res.status(404).json({ message: "No rooms found for this hotel" });
        }
        return res.status(200).json(rooms);
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
