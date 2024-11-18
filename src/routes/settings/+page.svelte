<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Eye, EyeOff } from 'lucide-svelte';
	import { onMount } from 'svelte';

	let openaiShow = $state(false);

	let openAiKey = $state('');
	let geminiApiKey = $state('');

	onMount(() => {
		if (localStorage.getItem('openai')) {
			openAiKey = localStorage.getItem('openai') as string;
			geminiApiKey = localStorage.getItem('gemini') as string;
		}

	});
</script>

<div class="grid w-1/2 gap-4 p-5">
	<div class="space-y-2">
		<Label class="text-right">OpenAI</Label>
		<div class="flex items-center justify-between gap-4">
			<Input
				type={openaiShow ? 'text' : 'password'}
				id="name"
				bind:value={openAiKey}
				class="col-span-3"
			/>
			<Button
				on:click={() => (openaiShow = !openaiShow)}
				size="sm"
				class="size-9 p-2"
				variant="secondary"
			>
				{#if openaiShow}
					<Eye />
				{:else}
					<EyeOff />
				{/if}
			</Button>
		</div>
		<Label class="text-right">Gemini</Label>
		<div class="flex items-center justify-between gap-4">
			<Input
				bind:value={geminiApiKey}
				class="col-span-3"
			/>
		</div>
	</div>
	<Button
		type="submit"
		class="w-fit"
		on:click={() => {
			localStorage.setItem('openai', openAiKey);
			localStorage.setItem('gemini', geminiApiKey);
		}}>Save</Button>

</div>

