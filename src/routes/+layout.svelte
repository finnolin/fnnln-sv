<script lang="ts">
	import '../app.css';
	import { ModeWatcher } from 'mode-watcher';
	import ThemeToggle from '$lib/components/ui/theme-toggle/theme-toggle.svelte';
	import WidgetUser from '$lib/components/elements/widget-user.svelte';
	let { children } = $props();
</script>

<ModeWatcher />
<ThemeToggle />
<WidgetUser />
{@render children()}
