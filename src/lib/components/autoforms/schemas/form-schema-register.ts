import * as z from 'zod/v4';
import { form_registry, field_registry } from '../autoform';
import * as Fields from '../fields';

export const form_schema_register = z
	.object({
		username: z.string().min(3).max(20).register(field_registry, {
			field_id: 'username',
			label: 'Username',
			component: Fields.Text
		}),
		email: z.email().register(field_registry, {
			field_id: 'email',
			label: 'Email',
			component: Fields.Text
		}),
		password: z.string().min(8).register(field_registry, {
			field_id: 'password',
			label: 'Password',
			hidden: true,
			component: Fields.Text
		}),
		confirm_password: z.string().min(8).register(field_registry, {
			field_id: 'confirm_password',
			label: 'Confirm Password',
			hidden: true,
			component: Fields.Text
		})
	})
	.register(form_registry, {
		title: 'Login'
	})
	.refine((data) => data.password === data.confirm_password, {
		message: 'Passwords do not match',
		path: ['confirm_password']
	});

export type FormSchemaRegister = typeof form_schema_register;
