import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { nextCookies } from 'better-auth/next-js';
import { username } from 'better-auth/plugins';

import { db } from '@/server/db/index';
import { env } from '@/env';

export const auth = betterAuth({
  appName: 'erp',
  baseURL: env.BETTER_AUTH_URL,
  secret: env.BETTER_AUTH_SECRET,
  database: drizzleAdapter(db, {
    provider: 'pg',
    usePlural: true,
  }),
  email: false,
  plugins: [
    nextCookies(),
    username(),
  ],
  emailAndPassword: {
    disableSignUp: false,
    enabled: true,
  },
  session: {
    expiresIn: 60 * 60 * 24 * 3, // 3 days
    updateAge: 60 * 60 * 24, // 1 day (every 1 day the session expiration is updated)
  },
  user: {
    additionalFields: {
      role: {
        type: 'string',
        required: true,
        input: true,
      },
    },
  },
});
