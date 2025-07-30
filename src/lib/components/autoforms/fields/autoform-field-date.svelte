<script lang="ts">
	import Input from '$lib/components/ui/input/input.svelte';
	let { field_meta, value: field_value = $bindable(), ...props } = $props();
</script>

Date
<Input
	{...props}
	name={field_meta.field_id}
	bind:value={field_value}
	type={field_meta.hidden ? 'password' : 'text'}
	readonly={field_meta.readonly}
	class={field_meta.readonly ? 'bg-gray-400 text-muted' : ''}
/>
