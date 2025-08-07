import { query } from '$app/server';
import { db } from '$lib/server/db';
import { count } from 'drizzle-orm';
import * as tables from '$lib/server/db/schema';

export const getOrgs = query(async () => {
	return 'test';
});

export const getCount = query(async () => {
	return 0;
});
