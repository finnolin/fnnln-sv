import { query } from '$app/server';
import z from 'zod/v4';
import { db } from '$lib/server/db';
import { count } from 'drizzle-orm';
import * as tables from '$lib/server/db/schema';

type TableMap = typeof tables;
type TableName = keyof TableMap;
type TableFields<T extends TableName> = TableMap[T];

// Define a schema for the query parameters
const query_schema = z.object({
	table: z.string() as z.ZodType<TableName>,
	fields: z.array(z.string()),
	offset: z.number().default(0), // offset
	limit: z.number().default(10) // limit
});

const query_schema_2 = z.discriminatedUnion('table', [
	z.object({
		table: z.literal('user') as z.ZodType<TableName>,
		fields: z.array(z.enum(['id', 'username', 'email' /* all user fields */])),
		offset: z.number().default(0),
		limit: z.number().default(10)
	}),
	z.object({
		table: z.literal('session') as z.ZodType<TableName>,
		fields: z.array(z.enum(['id', 'name' /* all org fields */])),
		offset: z.number().default(0),
		limit: z.number().default(10)
	})
	// ... repeat for every table
]);

export const getRecords = query(query_schema, async (query) => {
	console.log(query.offset);
	const fields: Record<string, any> = {};
	const table = tables[query.table];
	query.fields.forEach((field: string) => {
		fields[field] = (table as any)[field];
	});

	const records = await db
		.select(fields)
		.from(table)
		.offset(Number(query.offset))
		.limit(query.limit);
	return records;
});

export const getCount = query(async () => {
	const result = await db.select({ count: count() }).from(tables.user);
	if (result.length === 0) return 0;
	return result[0].count;
});
