<script lang="ts">
	import * as Table from '$lib/components/ui/table';
	import DbPagination from '$lib/components/elements/admin/db-pagination.svelte';

	import { getUsers, getCount } from './user.remote';

	let current_page = $state(1);

	let query = $state({
		table: 'user',
		l: 5,
		o: 0,
		fields: ['username', 'email', 'role']
	});

	function handlePageChange(page_number: number) {
		query.o = (page_number - 1) * query.l;
		//getUsers({ table: 'users', l: limit, o: offset, fields: fields });
		getUsers(query);
	}
</script>

<div class="flex h-12 flex-row items-center justify-between p-2">
	<h1 class="text-2xl">Users: {await getCount()} {current_page}</h1>
</div>

<div class="flex min-h-0 flex-1 flex-col justify-between">
	<Table.Root class="min-h-0 w-full flex-1 overflow-y-auto">
		<Table.Header>
			<Table.Row>
				{#each query.fields as field}
					<Table.Head>{field}</Table.Head>
				{/each}
				<!-- <Table.Head class="w-[100px]">Username</Table.Head>
				<Table.Head>email</Table.Head>
				<Table.Head>email verified</Table.Head>
				<Table.Head>role</Table.Head>
				<Table.Head>Banned</Table.Head>
				<Table.Head>Created</Table.Head> -->
			</Table.Row>
		</Table.Header>
		<Table.Body>
			{#each await getUsers(query) as user}
				<Table.Row>
					{#each query.fields as field}
						<Table.Head>{user[field]}</Table.Head>
					{/each}
					<!-- <Table.Cell>{user.username}</Table.Cell>
					<Table.Cell>{user.email}</Table.Cell>
					<Table.Cell>{user.email_verified}</Table.Cell>
					<Table.Cell>{user.role}</Table.Cell>
					<Table.Cell>{user.banned ? 'yes' : 'no'}</Table.Cell>
					<Table.Cell
						>{user.created?.getDate()}.{user.created?.getMonth()}.{user.created?.getFullYear()}</Table.Cell> -->
				</Table.Row>
			{/each}
		</Table.Body>
	</Table.Root>
	<div class="flex h-10 w-full flex-row items-center justify-between p-2">
		<DbPagination
			bind:current_page
			offset={query.o}
			limit={query.l}
			count={await getCount()}
			changePage={(page_number) => {
				handlePageChange(page_number);
			}} />
	</div>
</div>
