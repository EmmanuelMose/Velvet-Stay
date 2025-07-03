import { Express } from "express";
import {
  createHotelController,
  getAllHotelsController,
  getHotelByIdController,
  updateHotelController,
  deleteHotelController
} from "../hotels/hotels.controller";


//create hotel
const hotelRoutes = (app: Express) => {
  app.route('/hotel').post(
    
    async (req, res, next) => {
      try {
        await createHotelController(req, res);
      } catch (error) {
        next(error);
      }
    }
  );
//get all hotels
  app.route('/hotels').get(
    
    async (req, res, next) => {
      try {
        await getAllHotelsController(req, res);
      } catch (error) {
        next(error);
      }
    }
  );
//get hotel by id
  app.route('/hotel/:id').get(
    
    async (req, res, next) => {
      try {
        await getHotelByIdController(req, res);
      } catch (error) {
        next(error);
      }
    }
  );
//update hotel
  app.route('/hotel/:id').put(
    
    async (req, res, next) => {
      try {
        await updateHotelController(req, res);
      } catch (error) {
        next(error);
      }
    }
  );
//delete hotel
  app.route('/hotel/:id').delete(
    
    async (req, res, next) => {
      try {
        await deleteHotelController(req, res);
      } catch (error) {
        next(error);
      }
    }
  );
};

export default hotelRoutes;
