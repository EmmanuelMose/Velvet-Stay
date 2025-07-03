import { Express } from "express";
import {
  createUserController,
  getAllUsersController,
  getUserByIdController,
  updateUserController,
  deleteUserController,
} from "../users/users.controller";


//create user
const userRoutes = (app: Express) => {
  app.route('/user').post(
    
    async (req, res, next) => {
      try {
        await createUserController(req, res);
      } catch (error) {
        next(error);
      }
    }
  );
//get all users
  app.route('/users').get(
    
    async (req, res, next) => {
      try {
        await getAllUsersController(req, res);
      } catch (error) {
        next(error);
      }
    }
  );
//update user
  app.route('/user/:id').get(
    
    async (req, res, next) => {
      try {
        await getUserByIdController(req, res);
      } catch (error) {
        next(error);
      }
    }
  );
//get user by id
  app.route('/user/:id').put(
    
    async (req, res, next) => {
      try {
        await updateUserController(req, res);
      } catch (error) {
        next(error);
      }
    }
  );
//delete user
  app.route('/user/:id').delete(
    
    async (req, res, next) => {
      try {
        await deleteUserController(req, res);
      } catch (error) {
        next(error);
      }
    }
  );
};

export default userRoutes;
