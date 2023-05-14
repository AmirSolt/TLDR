<script lang="ts">
    import {otpInit, verifyToken} from './authFuncs';
    import {page} from '$app/stores';
    import { TabGroup, Tab } from '@skeletonlabs/skeleton';
    $: ({supabase} = $page.data)

    export let response;
    export let stepIndex;

    let tabSet:string = "OTP";

    let usedEmail:string;

    async function otpInitForm(e){
        const form = e.target
        const data = new FormData(form)
        usedEmail = data.get('email')?.toString()?? ''
        response = await otpInit(supabase, data)
        tabSet = "Verify"
    }
    async function verifyTokenForm(e) {
        const form = e.target
        const data = new FormData(form)
        response = await verifyToken(supabase, data)

        stepIndex = 2;
    }



</script>



<TabGroup  
    justify="justify-start"
    active="variant-filled-primary"
    hover="hover:variant-soft-primary"
    flex="flex-1 lg:flex-none"
    class="w-full"
    >
	<Tab bind:group={tabSet} name="tab1" value="OTP">One Time Password</Tab>
	<Tab bind:group={tabSet} name="tab2" value="Verify">Verify Token</Tab>
	<!-- Tab Panels --->
	<svelte:fragment slot="panel">
		

    {#if tabSet==="OTP"}

        <form on:submit|preventDefault={otpInitForm}>
            <label for="email">Email</label>
            <input type="email" name="email" id="email" required>
            <button class="btn variant-filled" type="submit">Send OTP</button>
        </form>

    {:else if tabSet==="Verify"}

        <form on:submit|preventDefault={verifyTokenForm}>
            <!-- <label for="email">Email</label> -->
            <input class="hidden" type="email" name="email" id="email" bind:value={usedEmail} >
            <label for="token">Token</label>
            <input type="text" name="token" id="token" required>
            <button class="btn variant-filled" type="submit">Verify</button>
        </form>

    {/if}

	</svelte:fragment>
</TabGroup>
			

