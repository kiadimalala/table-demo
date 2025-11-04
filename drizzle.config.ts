import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";
config({ path: ".env" });

const dbUri = process.env.DATABASE_URL!;

export default defineConfig({
  schema: "./core/infra/repositories/external/drizzle/schema.ts",
  out: "./core/infra/repositories/external/drizzle/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: dbUri!,
  },
});
