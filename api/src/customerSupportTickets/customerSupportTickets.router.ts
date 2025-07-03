// customerSupport.routes.ts
import { Express } from "express";
import {
  createCustomerSupportTicketController,
  getAllCustomerSupportTicketsController,
  getCustomerSupportTicketByIdController,
  updateCustomerSupportTicketController,
  deleteCustomerSupportTicketController
} from "../customerSupportTickets/customerSupportTickets.controller";

const customerSupportRoutes = (app: Express) => {
  app.route('/ticket').post(
    async (req, res, next) => {
      try {
        await createCustomerSupportTicketController(req, res);
      } catch (error) {
        next(error);
      }
    }
  );

  app.route('/tickets').get(
    async (req, res, next) => {
      try {
        await getAllCustomerSupportTicketsController(req, res);
      } catch (error) {
        next(error);
      }
    }
  );

  app.route('/ticket/:id').get(
    async (req, res, next) => {
      try {
        await getCustomerSupportTicketByIdController(req, res);
      } catch (error) {
        next(error);
      }
    }
  );

  app.route('/ticket/:id').put(
    async (req, res, next) => {
      try {
        await updateCustomerSupportTicketController(req, res);
      } catch (error) {
        next(error);
      }
    }
  );

  app.route('/ticket/:id').delete(
    async (req, res, next) => {
      try {
        await deleteCustomerSupportTicketController(req, res);
      } catch (error) {
        next(error);
      }
    }
  );
};

export default customerSupportRoutes;