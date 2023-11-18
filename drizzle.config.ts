import type { Config } from "drizzle-kit";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

export default {
  schema: "./db/schema.ts",
  out: "./db",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL ?? "No valid DB url",
  },
  driver: "mysql2",
  breakpoints: true,
} satisfies Config;
