import { redirect } from '@sveltejs/kit';
import { APIError } from 'better-auth/api';
import { auth } from '$lib/server/auth';
import type { Actions, PageServerLoad } from './$types';
import { zod4 as zod } from 'sveltekit-superforms/adapters';
import { superValidate, message, fail } from 'sveltekit-superforms';
import { form_schema_register } from '$lib/components/autoforms/schemas/form-schema-register';
import { form_schema_login } from '$lib/components/autoforms/schemas/form-schema-login';

export const load: PageServerLoad = async (event) => {
	const session = await auth.api.getSession({ headers: event.request.headers });
	if (session) {
		redirect(302, '/');
	}
};

export const actions: Actions = {
	login: async ({ request }) => {
		const form = await superValidate(request, zod(form_schema_login));
		if (!form.valid) {
			return fail(400, { form });
		}
		try {
			await auth.api.signInEmail({
				body: {
					email: form.data.email,
					password: form.data.password,
					rememberMe: true
				},
				headers: request.headers
			});
		} catch (error) {
			if (error instanceof APIError) {
				console.log(error.message, error.status);
				return message(form, {
					type: 'error',
					text: error.message
				});
			}
		}
		return { form };
	},
	register: async ({ request }) => {
		const form = await superValidate(request, zod(form_schema_register));
		if (!form.valid) {
			// Return { form } and things will just work.
			return fail(400, { form });
		}
		try {
			await auth.api.signUpEmail({
				body: {
					email: form.data.email,
					name: form.data.username,
					password: form.data.password
				}
			});
		} catch (error) {
			if (error instanceof APIError) {
				console.log(error.message, error.status);
				return message(form, {
					type: 'error',
					text: error.message
				});
			}
		}
		return { form };
	}
};
