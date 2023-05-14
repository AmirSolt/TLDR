<script lang="ts">
	import { AppBar, LightSwitch } from '@skeletonlabs/skeleton'
	import { Flame, Home } from 'lucide-svelte'

	import SettingsTrigger from '$lib/components/setttings/SettingsTrigger.svelte';


	import { page } from '$app/stores'
	$: user = $page.data.session?.user
</script>





<AppBar padding="p-4">

		<svelte:fragment slot="lead">
			<a class="flex gap-1" href="/">
				<Flame /> TL;DR
			</a>
		</svelte:fragment>
	
		<svelte:fragment slot="trail" >
			
			<div class="mx-2">
				<LightSwitch />
			</div>
	
			<a class="flex gap-1" href="/pricing">
				Pricing
			</a>
			
			{#if user}
			<SettingsTrigger />
			
			{/if}
			
		</svelte:fragment>
</AppBar>