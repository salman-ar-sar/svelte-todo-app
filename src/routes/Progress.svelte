<script lang="ts">
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';

	export let className: string;

	const progress = tweened(0, {
		duration: 400,
		easing: cubicOut
	});

	const percentages = [0, 0.25, 0.5, 0.75, 1];
</script>

<div class="flex flex-col items-center gap-2 {className}">
	<h3 class="text-xl font-semibold text-cyan-400 underline mb-2">
		A Progress Bar with tweened Progress
	</h3>
	<progress class="w-full progress progress-secondary" value={$progress} />
	<div class="flex gap-2">
		{#each percentages as percentage}
			<button
				class="btn btn-outline btn-accent min-h-8 h-8 px-2"
				on:click={() => progress.set(percentage)}
			>
				{percentage * 100}%
			</button>
		{/each}
	</div>
</div>
