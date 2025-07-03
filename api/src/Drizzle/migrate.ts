// src/Drizzle/migrate.ts
import { migrate } from "drizzle-orm/node-postgres/migrator";
import db from "./db";

async function main() {
  try {
    console.log("Running migrations...");
    await migrate(db, { migrationsFolder: "./src/Drizzle/migrations" });
    console.log("Migrations completed successfully.");
  } catch (error) {
    console.error("Migration failed:", error);
    process.exit(1);
  }
}

main();
