<script lang="ts">
	import '../app.css';
	import { ModeWatcher } from 'mode-watcher';
	let { children } = $props();
	import ThemeToggle from '$lib/components/ui/theme-toggle/theme-toggle.svelte';
</script>

<ModeWatcher />
<ThemeToggle />
{@render children()}
