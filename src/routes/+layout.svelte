<script lang='ts'>
	import Header from '$lib/components/basic/Header.svelte'
	import Footer from '$lib/components/basic/Footer.svelte';
	import MiniDashboard from '$lib/components/dashboard/MiniDashboard.svelte';
	import SettingsMenu from '$lib/components/setttings/SettingsMenu.svelte';
	import { AppShell } from '@skeletonlabs/skeleton';


	import '@skeletonlabs/skeleton/themes/theme-crimson.css'
	import '@skeletonlabs/skeleton/styles/all.css'
	import '../app.postcss'

	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	export let data;
	$: ({ supabase, session } = data);
	
	
	import {loadInWallet} from '$lib/data/stores'
	



	onMount(() => {
		loadInWallet(session?.user.id, supabase)
		// ================================
		const { data } = supabase.auth.onAuthStateChange((event, _session) => {
			console.log('onAuthStateChange', event, _session);
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});
		return () => data.subscription.unsubscribe();
	});

	


</script>



<svelte:head>
	<title>TLDR</title>
	<link rel="icon" href="https://fav.farm/🔥" />
</svelte:head>


<AppShell>

	<svelte:fragment slot="header">
		<header>
				<Header />
		</header>
	</svelte:fragment>

	
	<SettingsMenu />

	<MiniDashboard />

	<div class="flex justify-center w-full">
		<div class="max-w-7xl p-4 w-full">
			<slot />
		</div>
	</div>	
	

	<svelte:fragment slot="footer">
		<footer>
			<Footer />
		</footer>
		
	</svelte:fragment>
</AppShell>