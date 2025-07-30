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
	form_id?: string;
	title?: string;
	action?: string;
	description?: string;
	button_text?: string;
	//callback?: () => void;
	callback?: (form_data?: z.infer<z.ZodObject<T>>) => void; // Updated type
	open?: boolean;
};
