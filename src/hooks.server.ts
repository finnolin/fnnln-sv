import { auth } from '$lib/server/auth';
import { svelteKitHandler } from 'better-auth/svelte-kit';
import { building } from '$app/environment';

export async function handle({ event, resolve }) {
	const session = await auth.api.getSession({ headers: event.request.headers });
	event.locals.session = session?.session;
	return svelteKitHandler({ event, resolve, auth, building });
}
