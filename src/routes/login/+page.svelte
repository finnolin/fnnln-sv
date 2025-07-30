<script lang="ts">
	import { form_schema_login } from '$lib/components/autoforms/schemas/form-schema-login';
	import Autoform from '$lib/components/autoforms/autoform.svelte';
</script>

<Autoform form_schema={form_schema_login} action={'?/login'} />
