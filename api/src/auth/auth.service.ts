
// src/auth/auth.service.ts

import db from "../Drizzle/db";
import { users } from "../Drizzle/schema";
import { eq } from "drizzle-orm";

export const createUserService = async (user: any) => {
    return db.insert(users).values(user).returning().then(res => res[0]);
};

export const getUserByEmailService = async (email: string) => {
    return db.query.users.findFirst({ where: eq(users.email, email) });
};

export const verifyUserService = async (email: string) => {
    return db.update(users)
        .set({ isVerified: true, verificationCode: null })
        .where(eq(users.email, email));
};

export const userLoginService = async ({ email }: { email: string }) => {
    return db.query.users.findFirst({ where: eq(users.email, email) });
};

