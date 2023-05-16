<script lang='ts'>
    import {page} from '$app/stores';
    import {wallet} from '$lib/data/stores';
    $: ({supabase, session} = $page.data)

    import Modal from '$lib/components/prompt/Modal.svelte';
    import AuthForm from '$lib/components/auth/AuthForm.svelte';
    import PaymentPrompt from '$lib/components/payment/PaymentPrompt.svelte';
    import Chat from '$lib/components/chat/Chat.svelte';

    export let showPrompt: boolean = false;    
    export let compareProducts;

</script>

<Modal bind:showModal={showPrompt}>
    {#if showPrompt}
        {#if !session?.user}
                <AuthForm />
        {:else if $wallet.plan=="FREE" && $wallet.credits < 1} 
            <!-- if free and usage pass credit -->
            <PaymentPrompt />
        {:else if $wallet.plan!="FREE" && $wallet.credits < 1} 
            <h3>
                You have used up all your credit for this month.
            </h3>
        {:else}
            <Chat {compareProducts} />
        {/if}
    {/if}
</Modal>
