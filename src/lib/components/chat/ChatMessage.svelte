<script lang="ts">
	import { Avatar } from '@skeletonlabs/skeleton';
	import { ChatCompletionRequestMessageRoleEnum } from 'openai'
	import type {Message} from './chatHelper'
	import { ProgressRadial } from '@skeletonlabs/skeleton';

	export let message: Message
</script>


{#if message.role === ChatCompletionRequestMessageRoleEnum.System}

<div></div>

{:else if message.role === ChatCompletionRequestMessageRoleEnum.User}

<div class="flex justify-end text-end">

	<div class=" w-3/4 my-2">
		<header class="">
			<small class="font-bold">User</small>
		</header>
		<div class="card p-4 variant-soft-secondary rounded-tl-none">
			<p>{message.content}</p>
		</div>
	</div>
</div>

					

{:else if message.role === ChatCompletionRequestMessageRoleEnum.Assistant}


<div class="flex justify-start text-start">
	<div class=" w-3/4 m-2">
		<header class="">
			<small class="font-bold">AI</small>
		</header>
		<div class="card p-4 variant-soft rounded-tr-none">
			<p>{message.content}</p>
		</div>
	</div>
</div>				

{:else if message.role === "loading"}

<div class="flex justify-start text-start">
	<div class=" w-20 m-2">
		<header class="">
			<small class="font-bold">AI</small>
		</header>
		<div class="card p-4 variant-soft rounded-tr-none">
			<ProgressRadial width='w-12'  stroke={100} meter="stroke-primary-500" track="stroke-primary-500/30" />	
		</div>
	</div>
</div>		

{/if}