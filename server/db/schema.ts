/**
 * Database schema for the 水晶男孩 ERP.
 *
 * Import tables and relations from this module to query the database with Drizzle ORM.
 *
 * @example
 * ```ts
 * import { db } from './db';
 * import { users, assets } from './schema';
 *
 * // Query users
 * const allUsers = await db.select().from(users);
 *
 * // Query with joins using relations
 * const assetsWithOwners = await db.query.assets.findMany({
 *   with: { owner: true }
 * });
 * ```
 */
import { boolean, index, pgTable, pgTableCreator, text, timestamp } from 'drizzle-orm/pg-core';
import { relations, sql } from 'drizzle-orm';

/**
 * Use this to create new tables with automatic 'cmrdb-ams_' prefix.
 *
 * @example
 * ```ts
 * export const myTable = createTable('my_table', (t) => ({
 *   id: t.text('id').primaryKey(),
 * }));
 * // Database table name will be: 'erp_my_table'
 * ```
 */
export const createTable = pgTableCreator((name) => `erp_${name}`);

/**
 * Add this to table schemas for automatic creation timestamp.
 * Set automatically on insert, never update manually.
 */
export const createdAt = timestamp('created_at').default(sql`now()`).notNull();

/**
 * Add this to table schemas for automatic update timestamp.
 * Maintained by Drizzle ORM, do not set manually.
 */
export const updatedAt = timestamp('updated_at').$onUpdate(() => new Date());

export const users = pgTable('users', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  emailVerified: boolean('email_verified').default(false).notNull(),
  image: text('image'),
  username: text('username').unique(),
  displayUsername: text('display_username'),
  role: text('role').notNull(),
  createdAt,
  updatedAt,
});

export const sessions = pgTable(
  'sessions',
  {
    id: text('id').primaryKey(),
    expiresAt: timestamp('expires_at').notNull(),
    token: text('token').notNull().unique(),
    ipAddress: text('ip_address'),
    userAgent: text('user_agent'),
    userId: text('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    createdAt,
    updatedAt,
  },
  (table) => [index('sessions_userId_idx').on(table.userId)],
);

export const accounts = pgTable(
  'accounts',
  {
    id: text('id').primaryKey(),
    accountId: text('account_id').notNull(),
    providerId: text('provider_id').notNull(),
    userId: text('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    accessToken: text('access_token'),
    refreshToken: text('refresh_token'),
    idToken: text('id_token'),
    accessTokenExpiresAt: timestamp('access_token_expires_at'),
    refreshTokenExpiresAt: timestamp('refresh_token_expires_at'),
    scope: text('scope'),
    password: text('password'),
    createdAt,
    updatedAt,
  },
  (table) => [index('accounts_userId_idx').on(table.userId)],
);

export const verifications = pgTable(
  'verifications',
  {
    id: text('id').primaryKey(),
    identifier: text('identifier').notNull(),
    value: text('value').notNull(),
    expiresAt: timestamp('expires_at').notNull(),
    createdAt,
    updatedAt,
  },
  (table) => [index('verifications_identifier_idx').on(table.identifier)],
);

export const userRelations = relations(users, ({ many }) => ({
  sessions: many(sessions),
  accounts: many(accounts),
}));

export const sessionRelations = relations(sessions, ({ one }) => ({
  users: one(users, {
    fields: [sessions.userId],
    references: [users.id],
  }),
}));

export const accountRelations = relations(accounts, ({ one }) => ({
  users: one(users, {
    fields: [accounts.userId],
    references: [users.id],
  }),
}));

export const roles = createTable(
  'roles',
  ({ text }) => ({
    id: text('id').primaryKey().unique(),
    name: text('name').notNull().unique(),
    permissions: text('permissions').notNull(),
    createdAt,
    updatedAt,
  }),
);
