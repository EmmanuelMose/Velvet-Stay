import { createPaymentController, getAllPaymentsController, getPaymentByIdController, updatePaymentController, deletePaymentController, getPaymentsByDateController } from "../payments/payments.controller.js";
const paymentRoutes = (app) => {
    app.route('/payment').post(async (req, res, next) => {
        try {
            await createPaymentController(req, res);
        }
        catch (error) {
            next(error);
        }
    });
    app.route('/payments').get(async (req, res, next) => {
        try {
            await getAllPaymentsController(req, res);
        }
        catch (error) {
            next(error);
        }
    });
    app.route('/payment/:id').get(async (req, res, next) => {
        try {
            await getPaymentByIdController(req, res);
        }
        catch (error) {
            next(error);
        }
    });
    app.route('/payment/:id').put(async (req, res, next) => {
        try {
            await updatePaymentController(req, res);
        }
        catch (error) {
            next(error);
        }
    });
    app.route('/payment/:id').delete(async (req, res, next) => {
        try {
            await deletePaymentController(req, res);
        }
        catch (error) {
            next(error);
        }
    });
    app.route('/payments/date/:date').get(async (req, res, next) => {
        try {
            await getPaymentsByDateController(req, res);
        }
        catch (error) {
            next(error);
        }
    });
};
export default paymentRoutes;
