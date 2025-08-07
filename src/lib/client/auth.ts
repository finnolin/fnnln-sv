import { createAuthClient } from 'better-auth/svelte';
import { adminClient } from 'better-auth/client/plugins';

export const client = createAuthClient({
	baseURL: 'http://localhost:5173',
	plugins: [adminClient()]
});
export const { signIn, signUp, signOut, useSession } = client;
