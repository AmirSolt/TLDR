<script lang="ts">
    import {X} from "lucide-svelte";
    import Prompt from "$lib/components/prompt/Prompt.svelte";
    let showPrompt: boolean = false;

    import {compareList} from '$lib/data/stores';
    function removeCompareProduct(product){
        compareList.update(
            (list) => list.filter((item) => item.asin !== product.asin)
        )
    }


    // import { ProgressRadial } from '@skeletonlabs/skeleton';
    import { ProgressBar } from '@skeletonlabs/skeleton';
    $: progressValue = ($compareList.length/3)*100;

</script>


<div class="flex justify-between items-center p-2 card drop-shadow-md !bg-transparent rounded-lg">
    
    
    
    <div >
        {#each $compareList as product}
        <!-- using tailwind turnecate button text in a way that it starts from begining and cuts in the middle -->
        <button type="button" class="w-48  btn variant-filled" on:click={()=>removeCompareProduct(product)}>
                <span class="truncate">
                    {product.title}
                </span>
                <span>
                    <X />
                </span>
            </button>
        {/each}
    </div>


    <div class="me-3">
        {#if $compareList.length>0}
        <button class="btn variant-filled-primary h-14" type="button" on:click={() => (showPrompt = true)}>
            Open Chat
        </button>  
        
        {:else}
        <button class="btn variant-ringed h-14" type="button" disabled>
            -
        </button>  
        {/if}
    </div>
    
</div>


<div >
    <ProgressBar meter="bg-primary-500" height='h-4' value={progressValue}>
        {$compareList.length}
    </ProgressBar>
</div>


<Prompt bind:showPrompt={showPrompt} />