import { query } from '$app/server';
import z from 'zod/v4';
import { db } from '$lib/server/db';
import { count } from 'drizzle-orm';
import * as tables from '$lib/server/db/schema';

// Define a schema for the query parameters
const query_schema = z.object({
	table: z.string(),
	fields: z.array(z.string()),
	o: z.number().default(0), // offset
	l: z.number().default(10) // limit
});

export const getUsers = query(query_schema, async (query) => {
	console.log(query.o);
	const fields: Record<string, any> = {};
	const table = (tables as any)[query.table];
	query.fields.forEach((field: string) => {
		fields[field] = table[field];
	});

	const users = await db.select(fields).from(table).offset(Number(query.o)).limit(query.l);
	return users;
});

export const getCount = query(async () => {
	const result = await db.select({ count: count() }).from(tables.user);
	if (result.length === 0) return 0;
	return result[0].count;
});
