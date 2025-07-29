

import { Express } from "express";
import {
  createBookingController,
  getAllBookingsController,
  getBookingByIdController,
  updateBookingController,
  deleteBookingController,
  updateBookingStatus
} from "../bookings/bookings.controller";

//create booking
const bookingRoutes = (app: Express) => {
  app.route('/booking').post(async (req, res, next) => {
    try {
      await createBookingController(req, res);
    } catch (error) {
      next(error);
    }
  });
//get all bookings
  app.route('/bookings').get(async (req, res, next) => {
    try {
      await getAllBookingsController(req, res);
    } catch (error) {
      next(error);
    }
  });
//get booking by id
  app.route('/booking/:id').get(async (req, res, next) => {
    try {
      await getBookingByIdController(req, res);
    } catch (error) {
      next(error);
    }
  });
//update booking
  app.route('/booking/:id').put(async (req, res, next) => {
    try {
      await updateBookingController(req, res);
    } catch (error) {
      next(error);
    }
  });
  
//delete booking
  app.route('/booking/:id').delete(async (req, res, next) => {
    try {
      await deleteBookingController(req, res);
    } catch (error) {
      next(error);
    }
  });
  // update booking status
  app.route('/booking/:bookingId/status').patch(async (req, res, next) => {
   try {
    await updateBookingStatus(req, res);
  } catch (error) {
    next(error);
  }
  });

};

export default bookingRoutes;
