import * as z from 'zod/v4';
import { form_registry, field_registry } from '../autoform';
import * as Fields from '../fields';

export const form_schema_login = z
	.object({
		email: z.string().min(3).register(field_registry, {
			field_id: 'email',
			label: 'Email',
			component: Fields.Text
		}),
		password: z.string().register(field_registry, {
			field_id: 'password',
			label: 'Password',
			hidden: true,
			component: Fields.Text
		})
	})
	.register(form_registry, {
		title: 'Login'
	});

export type FormSchemaLogin = typeof form_schema_login;
