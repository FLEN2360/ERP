import { env } from '@/env';
import { Config } from "drizzle-kit";

export default {
  schema: "./server/db/schema.ts",
  out: "./migrations",
  dialect: "postgresql",
  tablesFilter: ['erp_*'],
  dbCredentials: {
    url: env.DATABASE_URL,
  },
} satisfies Config;
