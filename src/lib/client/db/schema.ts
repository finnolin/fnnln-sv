import { pgTable, timestamp, text, boolean } from 'drizzle-orm/pg-core';
import { generateUniqueString } from '../../global/utils';

// Tables that are used by both client and server
export const user = pgTable('user', {
	id: text('id')
		.primaryKey()
		.$default(() => generateUniqueString()),
	username: text('username').notNull().unique(),
	email: text('email').unique().notNull(),
	email_verified: boolean('email_verified'),
	image: text('image'),
	created: timestamp('created').defaultNow(),
	updated: timestamp('updated').defaultNow(),
	role: text('role').default('user'),
	banned: boolean('banned').default(false),
	ban_reason: text('ban_reason'),
	ban_expires: timestamp('ban_expires')
});

export type User = typeof user.$inferSelect;
