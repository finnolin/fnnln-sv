<script lang="ts">
	// Libraries:
	import { superForm, defaults } from 'sveltekit-superforms';
	import { zod4 as zod, zodClient } from 'sveltekit-superforms/adapters';

	// Components:
	import * as Form from '$lib/components/ui/form/index.js';
	import AutoformField from './fields/autoform-field.svelte';
	import AutoformMessage from './autoform-message.svelte';
	import * as Card from '$lib/components/ui/card/index.js';

	// Utility
	import { getMeta } from './autoform';

	// Props:
	import type { AutoFormProps } from './types';

	let {
		form_id,
		form_schema,
		spa_mode,
		title,
		action,
		description,
		container_type = 'none',
		button_text,
		callback,
		open = $bindable()
	}: AutoFormProps = $props();

	let loading = $state(false);
	const form_data = $state(defaults(zod(form_schema)));
	const super_form = $state(
		// Renamed to avoid confusion with the $form store from super_form.form
		superForm(form_data, {
			SPA: spa_mode,
			dataType: 'json',
			id: form_id,
			validators: zodClient(form_schema),
			validationMethod: 'auto',
			onResult: async ({ result }) => {
				// This hook is called after the server responds to the form submission.
				if (result) {
					if (callback) {
						// Await the callback if it's async
						const callback_result = await callback(result);
						// Handle any errors returned from the callback
						if (callback_result && callback_result.error) {
							// Set form-level error or field-specific errors
							super_form.message.set({
								type: 'error',
								text: callback_result.error.message || 'An error occurred'
							});
							result.type = 'error';
						}
					}
				}

				if (result.type === 'success' || result.type === 'redirect') {
					super_form.reset(); // Reset the form fields
					if (open) open = false; // Close the dialog
					loading = false;
				}

				if (result.type === 'error' || result.type === 'failure') {
					loading = false;
					console.log('ERRR:');
					console.log(result);
				}
			}
		})
	);
	const { message, enhance } = super_form;
	const form_meta = getMeta(form_schema);
</script>

{#snippet formContent()}
	<Card.Root>
		{#if title || description}
			<Card.Header>
				{#if title}
					<Card.Title>{title}</Card.Title>
				{/if}
				{#if description}
					<Card.Description>{description}</Card.Description>
				{/if}
			</Card.Header>
		{/if}
		<Card.Content>
			<form method="post" {...action ? { action } : {}} use:enhance>
				{#each form_meta.fields as field}
					<AutoformField superform={super_form} field={field.field_id} meta={field} />
				{/each}
				{#if !loading}
					<Form.Button
						onclick={() => {
							loading = true;
							super_form.submit();
						}}>{button_text ? button_text : 'Submit'}</Form.Button>
				{:else}
					<Form.Button disabled>Submitting...</Form.Button>
				{/if}
				{#if $message && $message.text}
					<AutoformMessage message={$message} />
				{/if}
			</form>
		</Card.Content>
	</Card.Root>
{/snippet}

{#if container_type === 'dialog'}
	{@render formContent()}
{:else if container_type === 'modal'}
	{@render formContent()}
{:else}
	{@render formContent()}
{/if}
