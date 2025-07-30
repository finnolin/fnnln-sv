<script lang="ts">
	import { form_schema_register } from '$lib/components/autoforms/schemas/form-schema-register';
	import Autoform from '$lib/components/autoforms/autoform.svelte';
	import { signIn } from '$lib/client/auth';
	async function handleSignIn(email: string, password: string) {
		await signIn.email({
			email: email,
			password: password
		});
	}
</script>

<Autoform
	form_schema={form_schema_register}
	action={'?/register'}
	callback={(result) => {
		const form_data = result.data.form.data;
		handleSignIn(form_data.email, form_data.password);
	}}
/>
