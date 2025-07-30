<script lang="ts">
	import { useSession, client as auth_client } from '$lib/client/auth';
	import { Button } from '$lib/components/ui/button';
	import { form_schema_login } from '$lib/components/autoforms/schemas/form-schema-login';
	import Autoform from '$lib/components/autoforms/autoform.svelte';
	const session = useSession();
</script>

<div>
	{#if $session.data}
		<div>
			<p>
				{$session?.data?.user.name}
			</p>
			<button
				on:click={async () => {
					await auth_client.signOut();
				}}>
				Sign Out
			</button>
		</div>
	{:else}
		<Button href="/login">login</Button>
	{/if}
</div>

<h1 class="text-3xl">Welcome to SvelteKit</h1>
<p class="text-md italic">
	his is a universal requirement for source code typography. It's not just a historic artifact from
	the olden days of terminals, but a useful convention to allow two dimensional structuring and
	highlighting differences on the character level.
</p>
