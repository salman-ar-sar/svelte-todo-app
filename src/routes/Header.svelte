<script>
	import { onMount } from 'svelte';
	import { typewriter } from './transitions';

	const messages = [
		'Welcome to my todo app!',
		'This site is made using just Svelte.',
		'All the transitions and animations are using Svelte helpers!',
		'There are no external libraries used for transitions.',
		'Styling is done using Tailwind CSS and Daisy UI.'
	];

	let i = 0;

	onMount(() => {
		const interval = setInterval(() => {
			i += 1;
			i %= messages.length;
		}, 2500);

		return () => {
			clearInterval(interval);
		};
	});
</script>

{#key i}
	<h1 in:typewriter={{ speed: 10 }} class="min-h-12 text-3xl font-bold underline text-cyan-200">
		{messages[i] || ''}
	</h1>
{/key}
