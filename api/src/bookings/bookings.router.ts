
// booking.routes.ts
import { Express } from "express";
import {
  createBookingController,
  getAllBookingsController,
  getBookingByIdController,
  updateBookingController,
  deleteBookingController
} from "../bookings/bookings.controller";

const bookingRoutes = (app: Express) => {
  app.route('/booking').post(async (req, res, next) => {
    try {
      await createBookingController(req, res);
    } catch (error) {
      next(error);
    }
  });

  app.route('/bookings').get(async (req, res, next) => {
    try {
      await getAllBookingsController(req, res);
    } catch (error) {
      next(error);
    }
  });

  app.route('/booking/:id').get(async (req, res, next) => {
    try {
      await getBookingByIdController(req, res);
    } catch (error) {
      next(error);
    }
  });

  app.route('/booking/:id').put(async (req, res, next) => {
    try {
      await updateBookingController(req, res);
    } catch (error) {
      next(error);
    }
  });

  app.route('/booking/:id').delete(async (req, res, next) => {
    try {
      await deleteBookingController(req, res);
    } catch (error) {
      next(error);
    }
  });
};

export default bookingRoutes;
