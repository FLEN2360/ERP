import { integer, text, boolean, pgTable, timestamp, pgTableCreator } from "drizzle-orm/pg-core";
import { relations, sql } from 'drizzle-orm';

export const createTable = pgTableCreator((name) => `erp_${name}`);

export const createdAt = timestamp('created_at').default(sql`now()`).notNull();

export const updatedAt = timestamp('updated_at').$onUpdate(() => new Date());

export const users = pgTable("users", {
  id: text("id").primaryKey().notNull().unique(),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  isActive: boolean("is_active").notNull().default(true),
});
