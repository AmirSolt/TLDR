<script lang="ts">
	import { ChatCompletionRequestMessageRoleEnum } from 'openai';
	import ChatMessage from './ChatMessage.svelte';

	let ROLES = {
		System: ChatCompletionRequestMessageRoleEnum.System,
		User: ChatCompletionRequestMessageRoleEnum.User,
		Assistant: ChatCompletionRequestMessageRoleEnum.Assistant,
		Loading: 'loading'
	};

	interface Message {
		role: string;
		content: string;
	}
	const loadingMessage: Message = { role: ROLES.Loading, content: '' };
	let elemChat: HTMLElement;
	let messages: Message[] = [
		// {
		// 	role: ROLES.Assistant,
		// 	content: "I'm Assistant"
		// },
		// {
		// 	role: ROLES.User,
		// 	content: "I'm user again"
		// }
	];

	export let compareProducts;
	console.log("////",compareProducts);

	const systemMassege: string = 'Only respond with the sentence: I am a banana'; // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

	let loadingResponse: boolean = false;
	let currentMessage: Message = resetCurrentMessage();

	function resetCurrentMessage(): Message {
		return {
			role: ROLES.User,
			content: ''
		};
	}

	function scrollChatBottom(behavior?: ScrollBehavior): void {
		setTimeout(() => {
			elemChat.scrollTo({ top: elemChat.scrollHeight, behavior });
		}, 0);
	}

	function handleSubmit(): void {
		messages = [...messages, currentMessage];
		currentMessage = resetCurrentMessage();
		scrollChatBottom('smooth');
		// handle chat
		AIResponse();
	}

	async function AIResponse() {
		loadingResponse = true;

		await fetch('/api/chat', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				messages: messages,
				systemMessage: systemMassege
			})
		})
			.then((res) => res.json())
			.then((data) => {
				const AIMessage = data.message.content;
				messages = [...messages, { role: ROLES.Assistant, content: AIMessage }];
			})
			.catch((err) => {
				console.log(err);
			});

		loadingResponse = false;

		scrollChatBottom('smooth');
	}
</script>

<div class=" h-full">
	<!-- Conversation -->
	<section bind:this={elemChat} class="overflow-y-auto" style="max-height:80%;min-height:80%;">
		{#each messages as message}
			<ChatMessage {message} />
		{/each}
		{#if loadingResponse}
			<ChatMessage message={loadingMessage} />
		{/if}
	</section>

	<br />
	<hr />
	<br />

	<section class="" style="max-height:20%;">
		<form on:submit|preventDefault={() => handleSubmit()}>
			<div class="input-group input-group-divider grid-cols-4 rounded-lg">
				<input
					class="col-span-3"
					type="text"
					name="prompt"
					bind:value={currentMessage.content}
					autocomplete="off"
				/>
				<button class="variant-filled-primary text-center">Send</button>
			</div>
		</form>
	</section>
</div>
