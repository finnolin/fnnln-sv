import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';
import * as schema from '../../client/db/schema';
import { generateUniqueString } from '../../global/utils';

export * from '../../client/db/schema';

// Below are tables that should only be visible to the server:

//Authentication:
export const session = pgTable('session', {
	id: text('id').primaryKey().notNull(),
	user_id: text('user_id').references(() => schema.user.id),
	token: text('token').notNull(),
	expires_at: timestamp('expires_at').notNull(),
	ip_address: text('ip_address'),
	user_agent: text('user_agent'),
	created: timestamp('created').defaultNow(),
	updated: timestamp('updated').defaultNow()
});
export type Session = typeof session.$inferSelect;

export const account = pgTable('account', {
	id: text('id')
		.primaryKey()
		.notNull()
		.$default(() => generateUniqueString()),
	user_id: text('user_id').references(() => schema.user.id),
	account_id: text('account_id').notNull(),
	provider_id: text('provider_id').notNull(),
	access_token: text('access_token'),
	access_token_expires: timestamp('access_token_expires'),
	refresh_token: text('refresh_token'),
	refresh_token_expires: timestamp('refresh_token_expires'),
	scope: text('scope'),
	id_token: text('id_token'),
	password_hash: text('password_hash'),
	created: timestamp('created').defaultNow(),
	updated: timestamp('updated').defaultNow()
});
export type Account = typeof account.$inferSelect;

export const verification = pgTable('verification', {
	id: serial('id').primaryKey().notNull(),
	identifier: text('identifier').notNull(),
	value: text('value').notNull(),
	expires: timestamp('expires').notNull(),
	created: timestamp('created').defaultNow(),
	updated: timestamp('updated').defaultNow()
});
