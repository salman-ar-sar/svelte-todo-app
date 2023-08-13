<script lang="ts">
	import type { PersistedTodo } from '$lib/server/database';
	import { flip } from 'svelte/animate';
	import { receive, send } from './transitions';

	export let data: {
		todos: PersistedTodo[];
	};
</script>

<ul class="space-y-2">
	{#each data.todos as todo (todo.id)}
		<li
			class:done={todo.done}
			in:receive={{ key: todo.id }}
			out:send={{ key: todo.id }}
			animate:flip={{ duration: 200 }}
		>
			<label class="flex items-center gap-3 border border-gray-700 rounded p-2">
				<input
					type="checkbox"
					class="checkbox checkbox-sm"
					checked={todo.done}
					on:change={async (e) => {
						const done = e.currentTarget.checked;

						await fetch(`/todo/${todo.id}`, {
							method: 'PUT',
							body: JSON.stringify({ done }),
							headers: {
								'Content-Type': 'application/json'
							}
						});
					}}
				/>
				<span class="flex-1">{todo.description}</span>
				<button
					class="btn-xs btn-circle btn-outline h-6 w-6"
					aria-label="Mark as complete"
					on:click={async () => {
						await fetch(`/todo/${todo.id}`, {
							method: 'DELETE'
						});

						data.todos = data.todos.filter((t) => t !== todo);
					}}
				>
					X
				</button>
			</label>
		</li>
	{/each}
</ul>
