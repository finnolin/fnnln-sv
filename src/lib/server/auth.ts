import { betterAuth } from 'better-auth';
import { createAuthMiddleware } from 'better-auth/api';
import { admin } from 'better-auth/plugins';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db } from '$lib/server/db';
import { eq } from 'drizzle-orm';
import * as tables from '$lib/server/db/schema';
import { sveltekitCookies } from 'better-auth/svelte-kit';
import { getRequestEvent } from '$app/server';

const admin_exits = await db.select().from(tables.user).where(eq(tables.user.role, 'admin'));

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: 'pg' // or "mysql", "sqlite"
	}),
	emailAndPassword: {
		enabled: true
	},
	plugins: [sveltekitCookies(() => getRequestEvent() as any), admin()],

	user: {
		modelName: 'user',
		fields: {
			name: 'username',
			emailVerified: 'email_verified',
			createdAt: 'created',
			updatedAt: 'updated',
			banExpires: 'ban_expires',
			banReason: 'ban_reason'
		} as any
	},
	session: {
		modelName: 'session',
		fields: {
			userId: 'user_id',
			expiresAt: 'expires_at',
			ipAddress: 'ip_address',
			userAgent: 'user_agent',
			createdAt: 'created',
			updatedAt: 'updated',
			impersonatedBy: 'impersonated_by'
		} as any
	},
	account: {
		modelName: 'account',
		fields: {
			userId: 'user_id',
			accountId: 'account_id',
			providerId: 'provider_id',
			accessToken: 'access_token',
			refreshToken: 'refresh_token',
			idToken: 'id_token',
			createdAt: 'created',
			updatedAt: 'updated',
			password: 'password_hash',
			accessTokenExpiresAt: 'access_token_expires',
			refreshTokenExpiresAt: 'refresh_token_expires'
		}
	},
	verification: {
		modelName: 'verification',
		fields: {
			expiresAt: 'expires',
			createdAt: 'created',
			updatedAt: 'updated'
		}
	},
	hooks: {
		after: createAuthMiddleware(async (ctx) => {
			if (ctx.path.startsWith('/sign-up')) {
				// make admin if no admin exits
				// TODO: create a env variable to toggle this functionality.
				if (!admin_exits.length) {
					if (!ctx.context.newSession) return;
					console.log('creating admin: ' + ctx.context.newSession.user.id);
					await db
						.update(tables.user)
						.set({ role: 'admin' })
						.where(eq(tables.user.id, ctx.context.newSession.user.id));
				}
			}
		})
	}
});

export type SessionValidationResult = Awaited<ReturnType<typeof auth.api.getSession>>;
