<script lang="ts" module>
	type T = Record<string, unknown>;
</script>

<script lang="ts" generics="T extends Record<string, unknown>">
	import type { HTMLInputAttributes } from 'svelte/elements';
	import type { FieldMeta } from '../autoform';
	import { formFieldProxy, type SuperForm, type FormPathLeaves } from 'sveltekit-superforms';

	import * as Form from '$lib/components/ui/form/index.js';

	type Props = HTMLInputAttributes & {
		superform: SuperForm<T>;
		field: FormPathLeaves<T>;
		meta: FieldMeta;
	};

	let { superform, field: field_id, meta, ...rest }: Props = $props();
	const { path, value, errors, constraints, ...proxy_rest } = formFieldProxy(superform, field_id);
</script>

<Form.Field form={superform} name={field_id}>
	<Form.Control>
		{#snippet children({ props })}
			<Form.Label>{meta.label}</Form.Label>
			<meta.component
				{...props}
				field_meta={meta}
				bind:value={$value}
				{...meta.autocomplete ? { autocomplete: meta.autocomplete } : {}} />
		{/snippet}
	</Form.Control>
	<Form.FieldErrors />
</Form.Field>
