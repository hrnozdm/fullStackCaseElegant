import { z } from "zod";
import dotenv from "dotenv";

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  PORT: z.coerce.number().positive().default(3000),

  MONGODB_URI: z.string("MongoDB URI boş olamaz"),
  DB_NAME: z.string().min(1, "Database adı boş olamaz"),

  JWT_SECRET: z.string().min(25, "JWT key en az 25 karakter olmalıdır"),
  JWT_EXPIRES_IN: z.string().default("7d"),
});

const validateEnv = () => {
  try {
    const env = envSchema.parse(process.env);
    return env;
  } catch (error) {
    console.error("Environment variables validation failed:", error);
    process.exit(1);
  }
};

const env = validateEnv();

export default env;
