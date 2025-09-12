import { drizzle } from "drizzle-orm/neon-http";

const db = drizzle(process.env.DB_URL!);
