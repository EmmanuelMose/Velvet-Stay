// src/auth/auth.router.ts

import { Express } from "express";
import { registerUserController, verifyUserController, loginUserController } from "../../src/auth/auth.controller.ts";


const authRoutes = (app: Express) => {
    // Register route
    app.route("/auth/register").post(
        async (req, res, next) => {
            try {
                await registerUserController(req, res);
            } catch (error: any) {
                next(error);
            }
        }
    );

    // Verify route
    app.route("/auth/verify").post(
        async (req, res, next) => {
            try {
                await verifyUserController(req, res);
            } catch (error: any) {
                next(error);
            }
        }
    );

    // Login route
    app.route("/auth/login").post(
        async (req, res, next) => {
            try {
                await loginUserController(req, res);
            } catch (error: any) {
                next(error);
            }
        }
    );
};

export default authRoutes;
