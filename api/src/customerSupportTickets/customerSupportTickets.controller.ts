
import { Request, Response } from "express";
import {
  createCustomerSupportTicketService,
  getAllCustomerSupportTicketsService,
  getCustomerSupportTicketByIdService,
  updateCustomerSupportTicketService,
  deleteCustomerSupportTicketService
} from "../customerSupportTickets/customerSupportTickets.service.js";

export const createCustomerSupportTicketController = async (req: Request, res: Response) => {
  try {
    const { userId, subject, description } = req.body;

    if (!userId || !subject || !description) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    const newTicket = await createCustomerSupportTicketService({
      userId,
      subject,
      description,
    });

    if (!newTicket) {
      return res.status(400).json({ message: "Ticket not created" });
    }

    return res.status(201).json({
      message: "Ticket created successfully",
      ticket: newTicket,
    });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};


export const getAllCustomerSupportTicketsController = async (req: Request, res: Response) => {
  try {
    const tickets = await getAllCustomerSupportTicketsService();
    if (!tickets || tickets.length === 0) {
      return res.status(404).json({ message: "No tickets found" });
    }
    return res.status(200).json({ data: tickets });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const getCustomerSupportTicketByIdController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid Ticket ID" });
    }
    const ticket = await getCustomerSupportTicketByIdService(id);
    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }
    return res.status(200).json({ data: ticket });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const updateCustomerSupportTicketController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid Ticket ID" });
    }

    const existingTicket = await getCustomerSupportTicketByIdService(id);
    if (!existingTicket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    const updated = await updateCustomerSupportTicketService(id, req.body);
    return res.status(200).json({ message: updated });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const deleteCustomerSupportTicketController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid Ticket ID" });
    }

    const existingTicket = await getCustomerSupportTicketByIdService(id);
    if (!existingTicket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    const deleted = await deleteCustomerSupportTicketService(id);
    return res.status(202).json({ message: deleted });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};