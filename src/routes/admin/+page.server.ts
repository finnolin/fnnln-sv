import { auth } from '$lib/server/auth';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	const local_session = event.locals.session;
	console.log('local_session', local_session);
	const session = await auth.api.getSession({ headers: event.request.headers });
	if (!session) {
		redirect(302, '/');
	}

	const user_has_permission = await auth.api.userHasPermission({
		body: {
			userId: session.user.id,
			permission: {
				user: ['create']
			}
		}
	});

	if (!user_has_permission || user_has_permission.success === false) {
		console.log(user_has_permission);
		redirect(302, '/');
	}
};
