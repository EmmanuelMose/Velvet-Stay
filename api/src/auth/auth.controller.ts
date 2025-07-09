// src/auth/auth.controller.ts

import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createUserService, getUserByEmailService, verifyUserService, userLoginService } from "./auth.service";
import { sendEmail } from "../../src/mailer";

export const registerUserController = async (req: Request, res: Response) => {
    try {
        const { email, password, confirmPassword, firstName, lastName, contactPhone, address } = req.body;

        if (!email || !password || !confirmPassword) return res.status(400).json({ message: "Email and passwords are required." });
        if (password !== confirmPassword) return res.status(400).json({ message: "Passwords do not match." });

        const hashedPassword = await bcrypt.hash(password, 10);
        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

        const newUser = await createUserService({
            email,
            password: hashedPassword,
            firstName,
            lastName,
            contactPhone,
            address,
            verificationCode,
            isVerified: false
        });

        await sendEmail(
            email,
            "Verify your account",
            `Hello ${lastName || "User"}, your verification code is: ${verificationCode}`,
            `<h2>Hello ${lastName || "User"},</h2><p>Your verification code is: <strong>${verificationCode}</strong></p>`
        );

        res.status(201).json({ message: "User registered. Verification code sent." });

    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const verifyUserController = async (req: Request, res: Response) => {
    const { email, verificationCode } = req.body;

    try {
        const user = await getUserByEmailService(email);

        if (!user) return res.status(404).json({ message: "User not found." });
        if (user.verificationCode !== verificationCode) return res.status(400).json({ message: "Invalid verification code." });

        await verifyUserService(email);

        await sendEmail(
            email,
            "Account Verified",
            `Hello ${user.lastName}, your account is now verified.`,
            `<h2>Hello ${user.lastName},</h2><p>Your account has been <strong>successfully verified</strong>.</p>`
        );

        res.status(200).json({ message: "User verified successfully." });

    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const loginUserController = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const user = await userLoginService({ email });

        if (!user) return res.status(404).json({ message: "User not found." });
        if (!user.isVerified) return res.status(403).json({ message: "Please verify your account first." });

        if (!user.password) return res.status(401).json({ message: "Invalid credentials." });
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(401).json({ message: "Invalid credentials." });

        const payload = {
            userId: user.userId,
            email: user.email,
            role: user.role,
            exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 3)
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET!);

        res.status(200).json({
            message: "Login successful.",
            token,
            user: {
                userId: user.userId,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role
            }
        });

    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

