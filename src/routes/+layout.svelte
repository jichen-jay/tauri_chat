<script lang="ts">
  import { Navbar, Sidebar } from "$lib/components/site";
  import ThemeToggle from "$lib/components/ui/theme-toggle.svelte";
  import "../app.pcss";

  interface Props {
    children?: import("svelte").Snippet;
  }

  let { children }: Props = $props();
</script>

<div class="h-[96vh]">
  <div
    class="z-10 hidden h-full border-r border-foreground/10 lg:fixed lg:inset-y-0 lg:flex lg:w-72"
  >
    <span>
      <Sidebar />
      <ThemeToggle />
    </span>
  </div>
  <main class="lg:pl-72">
    <div class="flex h-screen flex-col">
      <Navbar />
      <div class="mt-20 flex-grow">
        {@render children?.()}
      </div>
    </div>
  </main>
</div>


<style>
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