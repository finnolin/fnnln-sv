import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db } from '$lib/server/db';
import { sveltekitCookies } from 'better-auth/svelte-kit';
import { getRequestEvent } from '$app/server';

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: 'pg' // or "mysql", "sqlite"
	}),
	emailAndPassword: {
		enabled: true
	},

	plugins: [sveltekitCookies(() => getRequestEvent() as any)],

	user: {
		modelName: 'user',
		fields: {
			name: 'username',
			emailVerified: 'email_verified',
			createdAt: 'created',
			updatedAt: 'updated'
		}
	},
	session: {
		modelName: 'session',
		fields: {
			userId: 'user_id',
			expiresAt: 'expires_at',
			ipAddress: 'ip_address',
			userAgent: 'user_agent',
			createdAt: 'created',
			updatedAt: 'updated'
		}
	},
	account: {
		modelName: 'account',
		fields: {
			userId: 'user_id',
			accountId: 'account_id',
			providerId: 'provider_id',
			accessToken: 'access_token',
			accessTokenExpiresAT: 'access_token_expires',
			refreshToken: 'refresh_token',
			refreshTokenExpiresAT: 'refresh_token_expires',
			idToken: 'id_token',
			createdAt: 'created',
			updatedAt: 'updated',
			password: 'password_hash'
		}
	},
	verification: {
		modelName: 'verification',
		fields: {
			expiresAt: 'expires',
			createdAt: 'created',
			updatedAt: 'updated'
		}
	}
});
