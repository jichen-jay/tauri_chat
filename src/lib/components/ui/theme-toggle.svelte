

<script>
	let darkMode = $state(false);
	function toggle() {
        darkMode = !darkMode;
        window.document.body.classList.toggle('dark');
    }
</script>

<button onclick={toggle}>
	{#if darkMode }
		Go light
	{:else}
		Go dark
	{/if}
</button>

<style>
	button {
		background: var(--bg-color);
		border-radius: 5px;
		color: var(--text-color);
		padding: 10px 15px;
	}
	
	button:active {
		background: inherit;
	}

	:root{
		--bg-color: #fee2e2;
		--text-color: #000000;
	}
	
	:global(body) {
		background: var(--bg-color);
		color: var(--text-color);
	}
	
	:global(body.dark) {
		--bg-color: #71717a;
		--text-color: #FFFFFF;
	}
</style>