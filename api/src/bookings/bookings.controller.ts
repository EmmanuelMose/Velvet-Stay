
import { Request, Response } from "express";
import {
  createBookingService,
  getAllBookingsService,
  getBookingByIdService,
  updateBookingService,
  deleteBookingService,
  updateBookingStatusService
} from "../bookings/bookings.service";

export const createBookingController = async (req: Request, res: Response) => {
  try {
    const booking = req.body;

    if (booking.checkInDate) booking.checkInDate = new Date(booking.checkInDate);
    if (booking.checkOutDate) booking.checkOutDate = new Date(booking.checkOutDate);

    const newBooking = await createBookingService(booking);

    if (!newBooking || newBooking.length === 0) {
      return res.status(400).json({ message: "Booking not created" });
    }

    console.log("Booking created successfully:", booking);
    return res.status(201).json({
      message: "Booking created successfully",
      booking: newBooking[0],
    });

  } catch (error: any) {
    console.error("Error creating booking:", error);
    return res.status(500).json({ error: error.message });
  }
};

export const getAllBookingsController = async (req: Request, res: Response) => {
  try {
    const bookings = await getAllBookingsService();

    if (!bookings || bookings.length === 0) {
      return res.status(404).json({ message: "No bookings found" });
    }

    return res.status(200).json(bookings); // includes hotel name & location now
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};


export const getBookingByIdController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid Booking ID" });
    }
    const booking = await getBookingByIdService(id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    return res.status(200).json({ data: booking });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const updateBookingController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid Booking ID" });
    }

    const existingBooking = await getBookingByIdService(id);
    if (!existingBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    const updateData = req.body;
    if (updateData.checkInDate) updateData.checkInDate = new Date(updateData.checkInDate);
    if (updateData.checkOutDate) updateData.checkOutDate = new Date(updateData.checkOutDate);

    const updated = await updateBookingService(id, updateData);
    return res.status(200).json({ message: updated });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const deleteBookingController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid Booking ID" });
    }

    const existingBooking = await getBookingByIdService(id);
    if (!existingBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    const deleted = await deleteBookingService(id);
    return res.status(202).json({ message: deleted });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const updateBookingStatus = async (req: Request, res: Response) => {
  const bookingId = parseInt(req.params.bookingId);
  const { status } = req.body;

  if (!["Pending", "Confirmed", "Cancelled"].includes(status)) {
    return res.status(400).json({ message: "Invalid booking status." });
  }

  try {
    const updatedBooking = await updateBookingStatusService(bookingId, status);

    if (!updatedBooking) {
      return res.status(404).json({ message: "Booking not found." });
    }

    res.status(200).json({
      message: "Booking status updated successfully.",
      booking: updatedBooking,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to update booking status.", error });
  }
};