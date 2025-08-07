<script lang="ts">
	import * as Pagination from '$lib/components/ui/pagination';
	let {
		count,
		//pages = $bindable(),
		current_page = $bindable(),
		offset = $bindable(),
		limit = $bindable(),
		changePage
	}: {
		count: number;
		current_page: number;
		offset: number;
		limit: number;
		changePage: (page_number: number) => void;
	} = $props();
</script>

<Pagination.Root
	{count}
	perPage={limit}
	bind:page={current_page}
	onPageChange={(page_number) => {
		changePage(page_number);
	}}>
	{#snippet children({ pages, currentPage })}
		<Pagination.Content>
			<Pagination.Item>
				<Pagination.PrevButton />
			</Pagination.Item>
			{#each pages as page (page.key)}
				{#if page.type === 'ellipsis'}
					<Pagination.Item>
						<Pagination.Ellipsis />
					</Pagination.Item>
				{:else}
					<Pagination.Item>
						<Pagination.Link {page} isActive={currentPage === page.value}>
							{page.value}
						</Pagination.Link>
					</Pagination.Item>
				{/if}
			{/each}
			<Pagination.Item>
				<Pagination.NextButton />
			</Pagination.Item>
		</Pagination.Content>
	{/snippet}
</Pagination.Root>
