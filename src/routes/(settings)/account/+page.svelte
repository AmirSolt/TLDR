<script lang='ts'>
    import RemoveAccount from '$lib/components/auth/RemoveAccount.svelte';

	import { page } from '$app/stores';
	$: ({ session } = $page.data);
</script>



<h1>
    Account
</h1>

<h3>
    Your email: {session?.user.email}
</h3>




<RemoveAccount />