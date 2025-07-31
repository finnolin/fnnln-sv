<script lang="ts">
	import { toggleMode } from 'mode-watcher';
	import { Button } from '$lib/components/ui/button/index.js';
</script>

<Button onclick={toggleMode} variant="outline" size="icon" class="p-2">
	<span class="scale-100 rotate-0 italic !transition-all dark:scale-0 dark:-rotate-90"
		>Mononoki</span>
	<span class="text absolute scale-0 rotate-90 italic !transition-all dark:scale-100 dark:rotate-0"
		>Dark</span>
	<span class="sr-only">Toggle theme</span>
</Button>
