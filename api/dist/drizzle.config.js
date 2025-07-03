"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const drizzle_kit_1 = require("drizzle-kit");
exports.default = (0, drizzle_kit_1.defineConfig)({
    dialect: "postgresql",
    schema: "./src/Drizzle/schema.ts",
    out: "./src/Drizzle/migrations",
    dbCredentials: {
        url: process.env.DATABASE_URL
    },
    verbose: true, // enables detailed logging
    strict: true, // enables strict mode for type safety, i.e. it will throw an error if there are any issues with the schema
});
