<script lang="ts">
	import { signIn } from '$lib/client/auth';
	import { form_schema_login } from '$lib/components/autoforms/schemas/form-schema-login';
	import Autoform from '$lib/components/autoforms/autoform.svelte';
	import { goto } from '$app/navigation';
	async function handleSignIn(email: string, password: string) {
		console.log(email, password);
		const { data, error } = await signIn.email({
			email: email, // required
			password: password, // required
			rememberMe: true
		});
		if (error) {
			console.log(error);

			return { error: error.message };
		} else {
			goto('/');
		}
	}
</script>

<!-- <Autoform form_id="login_via_server" form_schema={form_schema_login} action={'?/login'} /> -->

<Autoform
	form_id="login_via_client"
	form_schema={form_schema_login}
	spa_mode={true}
	callback={async (result) => {
		const form_data = result.data.form.data;
		const sign_in_result = await handleSignIn(form_data.email, form_data.password);
		if (sign_in_result && sign_in_result.error) {
			return { error: { message: sign_in_result.error } };
		}
	}} />
