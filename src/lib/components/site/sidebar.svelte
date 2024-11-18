<script>
	import { page } from '$app/stores';
	import { getRoutes } from '$lib/config';
	import { cn } from '$lib/utils';
	import { buttonVariants } from '../ui/button';

	let routes = getRoutes();
</script>

<div class="dark:grainy flex w-full flex-col">
	<div class="flex-1 px-3 py-2">
		<div class="-mt-2 space-y-1.5">
			{#each routes as route (route.href)}
				<a
					data-sveltekit-preload-data
					href={route.href}
					class={cn(
						buttonVariants({
							variant: 'ghost'
						}),
						'w-full',
						`${
							$page.url.pathname === route.href
								? 'bg-foreground/10 font-semibold tracking-wide text-foreground transition-all duration-500 hover:bg-foreground/5'
								: 'text-foreground/60 hover:bg-foreground/10'
						}`
					)}
				>
					<div class="relative flex flex-1 items-center gap-2">
						<route.icon class={cn('h-7 w-7', route.color)} />
						<div class="ml-2 flex w-full items-center justify-between">
							<div>
								{route.label}
							</div>
						</div>
					</div>
				</a>
			{/each}
		</div>
	</div>
</div>
