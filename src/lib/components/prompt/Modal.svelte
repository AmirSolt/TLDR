<script lang='ts'>
	export let showModal:boolean;
	let dialog:any;
	import {X} from 'lucide-svelte'


	$: if (dialog && showModal) dialog.showModal();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
{#if showModal}
<dialog
	class="card rounded-lg p-0 w-5/6 h-5/6 max-w-2xl "
	bind:this={dialog}
	on:close={() => (showModal = false)}
	on:click|self={() => dialog.close()}
>
	<div on:click|stopPropagation class="h-full">
		<div class="absolute top-1 right-1" >
			<!-- svelte-ignore a11y-autofocus -->
			<button class="btn-icon variant-filled" autofocus on:click={() => dialog.close()}><X /></button>
		</div>
		<!-- <slot name="header" /> -->
		<div class="h-full" style="max-height:80%">
			<slot  />
		</div>

		<br>
		<br>
		
	</div>
</dialog>
{/if}

<style>

	dialog::backdrop {
		background: rgba(0, 0, 0, 0.3);
	}
	dialog[open] {
		animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
	}
	@keyframes zoom {
		from {
			transform: scale(0.95);
		}
		to {
			transform: scale(1);
		}
	}
	dialog[open]::backdrop {
		animation: fade 0.2s ease-out;
	}
	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
</style>
