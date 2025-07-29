import { Express } from "express";
import {
  createRoomController,
  getAllRoomsController,
  getRoomByIdController,
  updateRoomController,
  deleteRoomController,
  getRoomsByHotelIdController,
} from "../rooms/rooms.controller.js";

const roomRoutes = (app: Express) => {
  app.route('/room').post(async (req, res, next) => {
    try {
      await createRoomController(req, res);
    } catch (error) {
      next(error);
    }
  });

  app.route('/rooms').get(async (req, res, next) => {
    try {
      await getAllRoomsController(req, res);
    } catch (error) {
      next(error);
    }
  });

  app.route('/room/:id').get(async (req, res, next) => {
    try {
      await getRoomByIdController(req, res);
    } catch (error) {
      next(error);
    }
  });

  app.route('/room/:id').put(async (req, res, next) => {
    try {
      await updateRoomController(req, res);
    } catch (error) {
      next(error);
    }
  });

  app.route('/room/:id').delete(async (req, res, next) => {
    try {
      await deleteRoomController(req, res);
    } catch (error) {
      next(error);
    }
  });
  //  Get available rooms by hotelId
  app.route('/rooms/hotel/:hotelId').get(async (req, res, next) => {
    try {
      await getRoomsByHotelIdController(req, res);
    } catch (error) {
      next(error);
    }
  });
};


export default roomRoutes;
