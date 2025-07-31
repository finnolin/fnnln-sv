<script lang="ts">
	let { message }: { message: App.Superforms.Message } = $props();
</script>

<span
	class={{
		'text-destructive': message.type === 'error',
		'text-sm leading-none font-medium': true
	}}>
	{message.text}
</span>
