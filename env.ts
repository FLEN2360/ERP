import { type } from 'arktype';

import 'dotenv/config';

const Env = type({
  NODE_ENV: '"development" | "production" | "test" = "development"',
  DATABASE_URL: 'string.url',
});

export const env = Env.assert(process.env);
