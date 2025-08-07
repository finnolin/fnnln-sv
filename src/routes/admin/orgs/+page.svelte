<script lang="ts">
	import { getOrgs, getCount } from './orgs.remote';
	let orgs = $state(await getOrgs());
	let count = $state(getCount());
</script>

{orgs}
{await count}
