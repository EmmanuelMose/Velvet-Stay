// payment.controller.ts
import { Request, Response } from "express";
import {
  createPaymentService,
  getAllPaymentsService,
  getPaymentByIdService,
  updatePaymentService,
  deletePaymentService,
  getPaymentsByDateService
} from "../payments/payments.service.js";

export const createPaymentController = async (req: Request, res: Response) => {
  try {
    const payment = req.body;

    if (payment.paymentDate) {
      payment.paymentDate = new Date(payment.paymentDate);
    }

    const newPayment = await createPaymentService(payment);
    if (!newPayment) {
      return res.status(400).json({ message: "Payment not created" });
    }
    return res.status(201).json({ message: "Payment created successfully", payment: newPayment });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const getAllPaymentsController = async (req: Request, res: Response) => {
  try {
    const payments = await getAllPaymentsService();
    if (!payments || payments.length === 0) {
      return res.status(404).json({ message: "No payments found" });
    }
    return res.status(200).json({ data: payments });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const getPaymentByIdController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid Payment ID" });
    }
    const payment = await getPaymentByIdService(id);
    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }
    return res.status(200).json({ data: payment });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const updatePaymentController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid Payment ID" });
    }

    const existingPayment = await getPaymentByIdService(id);
    if (!existingPayment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    const updateData = req.body;

    if (updateData.paymentDate) {
      updateData.paymentDate = new Date(updateData.paymentDate);
    }

    const updated = await updatePaymentService(id, updateData);
    return res.status(200).json({ message: updated });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const deletePaymentController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid Payment ID" });
    }

    const existingPayment = await getPaymentByIdService(id);
    if (!existingPayment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    const deleted = await deletePaymentService(id);
    return res.status(202).json({ message: deleted });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};


export const getPaymentsByDateController = async (req: Request, res: Response) => {
  try {
    const { date } = req.params;

    if (!date || typeof date !== "string") {
      return res.status(400).json({ message: "Invalid or missing payment date" });
    }

    const results = await getPaymentsByDateService(date);

    if (!results || results.length === 0) {
      return res.status(404).json({ message: "No payments found on that date" });
    }

    return res.status(200).json({ data: results });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};