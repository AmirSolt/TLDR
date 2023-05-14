<script lang="ts">

	import { drawerStore } from '@skeletonlabs/skeleton';
	import type { DrawerSettings } from '@skeletonlabs/skeleton';


	function triggerDrawer(position: 'left' | 'top' | 'right' | 'bottom'): void {
		const drawerSettings: DrawerSettings = {
			id: 'demo',
			// Property Overrides
			position: position,
			bgDrawer: '',
			bgBackdrop: 'bg-gradient-to-r from-slate-800/40 via-gray-500/40 to-cyan-300/40',
			width: 'w-[280px] md:w-[480px]',
			padding: 'p-4',
			rounded: 'rounded-xl',
			// Metadata
			meta: 'Styled Drawer'
		};
		drawerStore.open(drawerSettings);
	}


</script>



<button class="btn-icon variant-filled" on:click={() => { triggerDrawer('right'); }}>
	<i class="fa-solid fa-arrow-left"></i>
</button>


