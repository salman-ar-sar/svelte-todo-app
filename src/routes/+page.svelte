<script>
	import { createTodoStore } from './TodoStore';
	import TodoList from './TodoList.svelte';
	import Header from './Header.svelte';
	import Progress from './Progress.svelte';
	import PersistedTodo from './PersistedTodo.svelte';

	const todos = createTodoStore([
		{ done: true, description: 'write some docs' },
		{ done: false, description: 'start writing blog post' },
		{ done: false, description: 'fix some bugs' },
	]);

	export let data;
</script>

<div class="flex flex-1 flex-col justify-center items-center">
	<Header />

	<h3 class="text-xl font-semibold text-cyan-400 underline mb-2">An in-state Todo app</h3>
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

	<Progress className="my-6 min-w-[36rem]" />

	<h3 class="text-xl font-semibold text-cyan-400 underline mb-2">
		A Todo app with a fake DB using APIs
	</h3>

	<section class="flex flex-col gap-4 max-w-xl mt-6">
		<input
			type="text"
			class="col-span-2 input input-bordered w-full max-w-xs mx-auto"
			placeholder="Add a new Todo"
			on:keydown={async (e) => {
				if (e.key === 'Enter') {
					const input = e.currentTarget;
					const description = input.value;

					const response = await fetch('/todo', {
						method: 'POST',
						body: JSON.stringify({ description }),
						headers: {
							'Content-Type': 'application/json',
						},
					});

					const { id } = await response.json();

					data.todos = [
						...data.todos,
						{
							id,
							description,
							done: false,
						},
					];

					input.value = '';
				}
			}}
		/>

		<PersistedTodo {data} />
	</section>
</div>

<style lang="postcss">
	:global(html) {
		background-color: theme(colors.gray.800);
	}
</style>
