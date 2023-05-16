<script lang="ts">
	import { page } from '$app/stores';
	import { wallet } from '$lib/data/stores';
	$: ({ session } = $page.data);

	import AuthForm from '$lib/components/auth/AuthForm.svelte';
	import PaymentPrompt from '$lib/components/payment/PaymentPrompt.svelte';
	import Modal from '$lib/components/prompt/Modal.svelte';

	let showModalAuth: boolean = false;
	let showModalPayment: boolean = false;

	let bgColor:string = 'success';
	let  isSubscribed: boolean = false;
	let hasCredits: boolean = false;
	let  highCredits: boolean = false;

	$: if(!session?.user){
		bgColor = "warning"
	} else if ($wallet?.plan == 'FREE') {
		isSubscribed = false;
		bgColor = "warning"
	}else if ($wallet?.credits < 1) {
		hasCredits = false;
		bgColor = "error"
	}else if ($wallet?.credits < 4) {
		highCredits = false;
		bgColor = "warning"
	}


	

	

	import {walletCreateTest, walletModifyTest} from '$lib/components/payment/subscriptions'

	async function testStripe(){
		walletModifyTest("PRO")
	}


</script>


{#key bgColor}

<div class="card h-18 p-4 variant-ghost-success variant-ghost-{bgColor} ">

	{#if !session?.user}
		<h3>
			You are not logged in
			<button class="btn variant-filled" type="button" on:click={() => (showModalAuth = true)}>
				Register/Login
			</button>
		</h3>
	
		<Modal bind:showModal={showModalAuth}>
			<AuthForm />
		</Modal>

	{:else}

		{#if hasCredits}
		<h3>
			You have <b>{$wallet?.credits}</b>  credits.
		</h3>
		{:else}
		<h3>
			You have used up all your credit for this month.
		</h3>
		{/if}

		<span></span>

	
		{#if !isSubscribed}

			<h3>
				Please choose a plan
				<button class="btn variant-filled" type="button" on:click={() => (showModalPayment = true)}>
					Plans
				</button>
			</h3>

			<Modal bind:showModal={showModalPayment}>
				<PaymentPrompt />
			</Modal>

		{/if}


	{/if}

</div>
{/key}



<button class="btn variant-filled" type="button" on:click={testStripe}>
	TEST STRIPE
</button>