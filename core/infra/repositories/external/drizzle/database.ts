import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";
import { drizzle } from "drizzle-orm/neon-http";
config({ path: ".env" });

// Prefer DATABASE_DEV_URL if provided, otherwise fallback to DATABASE_URL
const dbUri = process.env.DATABASE_URL;

if (!dbUri) {
  throw new Error(
    "Database connection string is not configured. Set DATABASE_DEV_URL or DATABASE_URL."
  );
}

// Configure Neon with better error handling
const sql = neon(dbUri);

export const db = drizzle({ client: sql });

// Test database connection function
export async function testDatabaseConnection(): Promise<boolean> {
  try {
    await sql`SELECT 1`;
    return true;
  } catch (error) {
    console.error("Database connection test failed:", error);
    return false;
  }
}
