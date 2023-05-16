<script lang="ts">
    import {X} from "lucide-svelte";
    import ChatPrompt from "$lib/components/prompt/ChatPrompt.svelte";
    import { Avatar } from '@skeletonlabs/skeleton';
    let showPrompt: boolean = false;

    import {compareList, userCountry} from '$lib/data/stores';
    function removeCompareProduct(product){
        compareList.update(
            (list) => list.filter((item) => item.asin !== product.asin)
        )
    }


    // import { ProgressRadial } from '@skeletonlabs/skeleton';
    import { ProgressBar } from '@skeletonlabs/skeleton';
    $: progressValue = ($compareList.length/3)*100;

    

    function openChatListener(){
        showPrompt = true;
    }



   

</script>


<div class="flex justify-between items-center p-2 card drop-shadow-md !bg-transparent rounded-lg">
    
    
    
    <div >
        {#each $compareList as product}
        <!-- using tailwind turnecate button text in a way that it starts from begining and cuts in the middle -->
        <button id="compare-button" type="button" class="relative w-32 h-24 p-0 btn m-2" on:click={()=>removeCompareProduct(product)}>
                <!-- <img class="min-w-8 min-h-8 max-w-12 max-h-12 rounded-lg" src="{product.thumbnail}" alt="Thumbnail"> -->
                <img class="max-w-full max-h-full rounded-lg" src="{product.image}" alt="Thumbnail">
                <!-- <span class="truncate">
                    {product.title}
                </span> -->
                <div class="absolute z-10 right-0 top-0 variant-filled rounded-full drop-shadow-2xl">
                    <span>
                        <X />
                    </span>
                </div>
            </button>
        {/each}
    </div>


    <div class="me-3">
        {#if $compareList.length>0}
        <button class="btn variant-filled-primary h-14" type="button" on:click={openChatListener}>
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


<ChatPrompt bind:showPrompt={showPrompt} />



