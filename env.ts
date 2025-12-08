import { type } from 'arktype';

import 'dotenv/config';

const Env = type({
  NODE_ENV: '"development" | "production" | "test" = "development"',
  DATABASE_URL: 'string.url',
  BETTER_AUTH_URL: 'string.url',
  BETTER_AUTH_SECRET: 'string',
});

export const env = Env.assert(process.env);
