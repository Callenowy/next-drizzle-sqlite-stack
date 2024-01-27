import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { createId } from '@paralleldrive/cuid2';

export const users = sqliteTable('user', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  username: text('username').notNull(),
  email: text('email').notNull(),
  emailVerified: integer('emailVerified', { mode: 'timestamp_ms' }),
  password_hash: text('password_hash').notNull(),
  salt: text('salt').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp_ms' }).default(
    sql`CURRENT_TIMESTAMP`
  ),
  last_login: integer('last_login', { mode: 'timestamp_ms' }).default(
    sql`CURRENT_TIMESTAMP`
  ),
  password_changed_at: integer('password_changed_at', { mode: 'timestamp_ms' }),
  failed_login_attempts: integer('failed_login_attempts').default(0),
  account_locked: integer('account_locked', { mode: 'boolean' }).default(false),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
