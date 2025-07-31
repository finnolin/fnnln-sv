//import { type ZodObject } from 'zod';

export interface FormMeta {
	form_id?: string;
	title?: string;
	description?: string;
}

export interface FieldMeta {
	field_id: string;
	label?: string;
	description?: string;
	readonly?: boolean;
	hidden?: boolean;
}

export type AutoFormProps<T extends z.ZodRawShape = z.ZodRawShape> = {
	form_schema: z.ZodObject<T>;
	spa_mode?: string | true | undefined;
	form_meta?: FormMeta;
	form_id?: string;
	title?: string;
	action?: string;
	description?: string;
	button_text?: string;
	container_type?: 'dialog' | 'modal' | 'none';
	callback?: (
		result: any
	) => Promise<{ error?: { message: string } } | void> | { error?: { message: string } } | void;
	open?: boolean;
};
