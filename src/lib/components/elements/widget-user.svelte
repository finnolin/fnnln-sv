<script lang="ts">
	import { useSession, signOut } from '$lib/client/auth';
	import { buttonVariants } from '../ui/button/button.svelte';
	import * as Popover from '$lib/components/ui/popover';
	import Button from '../ui/button/button.svelte';
	import Separator from '../ui/separator/separator.svelte';

	let session = useSession();
</script>

<div class="fixed top-0 right-0 z-10 p-2">
	{#if $session && $session.data}
		<Popover.Root>
			<Popover.Trigger class={[buttonVariants({ variant: 'outline' }), 'cursor-pointer']}>
				{$session.data.user.name}</Popover.Trigger>
			<Popover.Content class="mx-2 mt-1 rounded-xs border-2 p-0">
				<div class="flex flex-col items-start">
					<div class="flex flex-col items-start p-4">
						<div class="text-md">
							{$session.data.user.name}
						</div>
						<div class="text-md text-foreground/50">
							{$session.data.user.email}
						</div>
					</div>
					<Separator class="p-[1px]" />
					<div class="flex w-full flex-col items-start">
						<Button variant="ghost" class="w-full items-start justify-start rounded-none"
							>Account</Button>
						<Separator class="p-[1px]" />
						<Button variant="ghost" class="w-full items-start justify-start rounded-none"
							>Manage App</Button>
					</div>
					<Separator class="p-[1px]" />
					<div class="flex w-full flex-col items-center p-4">
						<Button
							onclick={async () => {
								await signOut();
							}}
							variant="destructive">Log Out</Button>
					</div>
				</div>
			</Popover.Content>
		</Popover.Root>
	{:else}
		<Button href="/login" variant="outline">Login</Button>
	{/if}
</div>
