"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/Drizzle/migrate.ts
const migrator_1 = require("drizzle-orm/node-postgres/migrator");
const db_1 = __importDefault(require("./db"));
async function main() {
    try {
        console.log("Running migrations...");
        await (0, migrator_1.migrate)(db_1.default, { migrationsFolder: "./src/Drizzle/migrations" });
        console.log("Migrations completed successfully.");
    }
    catch (error) {
        console.error("Migration failed:", error);
        process.exit(1);
    }
}
main();
