<script lang="ts">
	export let data;
	$: ({ streamed } = data);

	import CompareBar from '$lib/components/products/CompareBar.svelte';
	import Card from '$lib/components/products/Card.svelte';
	import Search from '$lib/components/search/Search.svelte';
    import CardsPlaceHolder from '$lib/components/products/CardsPlaceHolder.svelte';
</script>

<Search />

<CompareBar />

<div class="my-5 w-full">
	{#await streamed.products}
    <CardsPlaceHolder />

    {:then products}
		{#if products?.length === 0}
			<h3>No products found</h3>
		{:else}
			<div class="grid gap-4 sm:grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 grid-rows-3">
				{#each products ?? [] as product}
					<Card {product} />	
				{/each}
			</div>
		{/if}
	{/await}
</div>
