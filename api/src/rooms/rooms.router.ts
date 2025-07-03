import { Express } from "express";
import {
  createRoomController,
  getAllRoomsController,
  getRoomByIdController,
  updateRoomController,
  deleteRoomController
} from "../rooms/rooms.controller";


//create room
const roomRoutes = (app: Express) => {
  app.route('/room').post(
    
    async (req, res, next) => {
      try {
        await createRoomController(req, res);
      } catch (error) {
        next(error);
      }
    }
  );
//get all rooms
  app.route('/rooms').get(
    
    async (req, res, next) => {
      try {
        await getAllRoomsController(req, res);
      } catch (error) {
        next(error);
      }
    }
  );
//get rooom by id
  app.route('/room/:id').get(
    
    async (req, res, next) => {
      try {
        await getRoomByIdController(req, res);
      } catch (error) {
        next(error);
      }
    }
  );
//update room
  app.route('/room/:id').put(
    
    async (req, res, next) => {
      try {
        await updateRoomController(req, res);
      } catch (error) {
        next(error);
      }
    }
  );
//delete room
  app.route('/room/:id').delete(
    
    async (req, res, next) => {
      try {
        await deleteRoomController(req, res);
      } catch (error) {
        next(error);
      }
    }
  );
};

export default roomRoutes;
