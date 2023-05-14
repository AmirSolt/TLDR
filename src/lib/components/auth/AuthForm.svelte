<script lang='ts'>

    import AuthOptions from './AuthOptions.svelte';
    import AuthEmail from './AuthEmail.svelte';
    import { ProgressRadial } from '@skeletonlabs/skeleton';
    import {ArrowLeft} from 'lucide-svelte'


    let response:any;
    let stepIndex:number = 0;

</script>



{#if stepIndex !== 0 }
    <div class="p-1">
        <button class="btn-icon variant-filled" on:click={()=>stepIndex=0}><ArrowLeft /></button>
    </div>
{/if}

<div class="p-4">

    {#if response}
        <p class={response.error?'variant-soft-error':'variant-soft-success'}>
        </p>
    
        <aside class={response.error?'alert variant-ghost-error':'alert variant-ghost-success'}>
            <div>(icon)</div>
            <div class="alert-message">
                <h3 class="h3">{response.message}</h3>
            </div>
        </aside>
        <br>
    {/if}
    
    
    
    
    
    {#if stepIndex === 0}
        <h1>
            Login Options
        </h1>
        <div class="py-3">
            <AuthOptions bind:stepIndex />
        </div>
    {:else if stepIndex === 1}
    
    
        <h1>
            Email Login
        </h1>
        <div class="mt-8">
            <AuthEmail bind:stepIndex bind:response />
        </div>

    {:else}

    <ProgressRadial  stroke={100} meter="stroke-primary-500" track="stroke-primary-500/30" />
    
    
    {/if}
</div>