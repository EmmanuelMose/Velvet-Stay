// src/auth/auth.router.ts
import { registerUserController, verifyUserController, loginUserController } from "../../src/auth/auth.controller";
const authRoutes = (app) => {
    // Register route
    app.route("/auth/register").post(async (req, res, next) => {
        try {
            await registerUserController(req, res);
        }
        catch (error) {
            next(error);
        }
    });
    // Verify route
    app.route("/auth/verify").post(async (req, res, next) => {
        try {
            await verifyUserController(req, res);
        }
        catch (error) {
            next(error);
        }
    });
    // Login route
    app.route("/auth/login").post(async (req, res, next) => {
        try {
            await loginUserController(req, res);
        }
        catch (error) {
            next(error);
        }
    });
};
export default authRoutes;
