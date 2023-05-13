<script lang='ts'>
	import Header from '$lib/components/basic/Header.svelte'
	import Footer from '$lib/components/basic/Footer.svelte';
	import MiniDashboard from '$lib/components/dashboard/MiniDashboard.svelte';
	import { AppShell } from '@skeletonlabs/skeleton';
	import { Drawer } from '@skeletonlabs/skeleton';


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

	<Drawer  >
		<div class="h-full flex flex-col pt-8 md:pt-20">
			<a href="/account" class="btn variant-soft h-20 mx-2 my-4 drop-shadow-md"  >
				<h2 class="font-bold"> Account</h2>
			</a>
			<a href="/payment" class="btn variant-soft h-20 mx-2 my-4 drop-shadow-md"  >
				<h2 class="font-bold"> Payment</h2>
			</a>
			<a href="/payment" class="btn variant-soft h-20 mx-2 my-4 drop-shadow-md"  >
				<h2 class="font-bold"> Chat History</h2>
			</a>
			<a href="/logout" class="btn variant-soft h-20 mx-2 my-4 drop-shadow-md"  >
				<h2 class="font-bold"> Logout</h2>
			</a>
		</div>
	</Drawer>
	

	<MiniDashboard />

	<div class="flex justify-center">
		<div class="max-w-7xl p-4">
			<slot />
		</div>
	</div>	
	

	<svelte:fragment slot="footer">
		<footer>
			<Footer />
		</footer>
		
	</svelte:fragment>
</AppShell>