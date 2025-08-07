import { db } from '.';
import * as schema from './schema';
import { eq, count, and } from 'drizzle-orm';

//TODO: generic filters
//type UserFilter =

//TODO: auth, who can do this?
export async function getUsers(limit: number, offset: number) {
	const users = await db.select().from(schema.user).offset(offset).limit(limit);
	return users;
}
