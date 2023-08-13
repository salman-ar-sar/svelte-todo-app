<script>
	import { createTodoStore } from './TodoStore';
	import TodoList from './TodoList.svelte';

	const todos = createTodoStore([
		{ done: true, description: 'write some docs' },
		{ done: false, description: 'start writing blog post' },
		{ done: false, description: 'fix some bugs' }
	]);
</script>

<div class="flex flex-1 flex-col justify-center items-center">
	<h1 class="text-3xl font-bold underline text-cyan-200">Hello world!</h1>

	<div class="grid grid-cols-2 gap-4 max-w-xl mt-6">
		<input
			class="col-span-2 input input-bordered w-full max-w-xs mx-auto"
			placeholder="what needs to be done?"
			on:keydown={(e) => {
				if (e.key === 'Enter') {
					todos.add(e.currentTarget.value);
					e.currentTarget.value = '';
				}
			}}
		/>

		<div class="flex flex-col gap-2">
			<h2 class="text-2xl">Todo</h2>
			<TodoList store={todos} done={false} />
		</div>
		<div class="flex flex-col gap-2">
			<h2 class="text-2xl">Done</h2>
			<TodoList store={todos} done={true} />
		</div>
	</div>
</div>

<style lang="postcss">
	:global(html) {
		background-color: theme(colors.gray.800);
	}
</style>
