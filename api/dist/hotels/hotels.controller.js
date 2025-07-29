import { createHotelService, getAllHotelsService, getHotelByIdService, updateHotelService, deleteHotelService, searchHotelsByLocationService, searchHotelsByRatingService, } from "../hotels/hotels.service.js";
// Create Hotel
export const createHotelController = async (req, res) => {
    try {
        const hotel = req.body;
        const newHotel = await createHotelService(hotel);
        if (!newHotel) {
            return res.status(400).json({ message: "Hotel not created" });
        }
        return res.status(201).json({ message: "Hotel created successfully", hotel: newHotel });
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
// Get All Hotels
export const getAllHotelsController = async (req, res) => {
    try {
        const hotels = await getAllHotelsService();
        if (!hotels || hotels.length === 0) {
            return res.status(404).json({ message: "No hotels found" });
        }
        return res.status(200).json(hotels);
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
// Get Hotel by ID
export const getHotelByIdController = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: "Invalid Hotel ID" });
        }
        const hotel = await getHotelByIdService(id);
        if (!hotel) {
            return res.status(404).json({ message: "Hotel not found" });
        }
        return res.status(200).json({ data: hotel });
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
// Update Hotel
export const updateHotelController = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: "Invalid Hotel ID" });
        }
        const existingHotel = await getHotelByIdService(id);
        if (!existingHotel) {
            return res.status(404).json({ message: "Hotel not found" });
        }
        const updated = await updateHotelService(id, req.body);
        return res.status(200).json({ message: updated });
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
// Delete Hotel
export const deleteHotelController = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: "Invalid Hotel ID" });
        }
        const existingHotel = await getHotelByIdService(id);
        if (!existingHotel) {
            return res.status(404).json({ message: "Hotel not found" });
        }
        const deleted = await deleteHotelService(id);
        return res.status(202).json({ message: deleted });
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
// Search by location
export const searchHotelsByLocationController = async (req, res) => {
    try {
        const { location } = req.params;
        if (!location || typeof location !== "string") {
            return res.status(400).json({ message: "Location parameter is required" });
        }
        const results = await searchHotelsByLocationService(location);
        if (!results || results.length === 0) {
            return res.status(404).json({ message: "No hotels found for this location" });
        }
        return res.status(200).json(results);
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
export const searchHotelsByRatingController = async (req, res) => {
    try {
        const { rating } = req.params;
        const ratingNumber = parseFloat(rating);
        if (isNaN(ratingNumber)) {
            return res.status(400).json({ message: "Valid numeric rating is required" });
        }
        const results = await searchHotelsByRatingService(ratingNumber);
        if (!results || results.length === 0) {
            return res.status(404).json({ message: "No hotels found for this rating" });
        }
        return res.status(200).json(results);
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
