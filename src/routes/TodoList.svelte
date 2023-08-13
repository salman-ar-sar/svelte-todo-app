<script lang="ts">
	import type { TodoStore } from './TodoStore';
	import { receive, send } from './transition';

	export let store: TodoStore;
	export let done: boolean;
</script>

<ul class="space-y-2">
	{#each $store.filter((todo) => todo.done === done) as todo (todo.id)}
		<li class:done in:receive={{ key: todo.id }} out:send={{ key: todo.id }}>
			<label class="flex items-center gap-3 border border-gray-700 rounded p-2">
				<input
					type="checkbox"
					class="checkbox checkbox-sm"
					checked={todo.done}
					on:change={(e) => store.mark(todo, e.currentTarget.checked)}
				/>

				<span class="flex-1">{todo.description}</span>

				<button
					class="btn-xs btn-circle btn-outline h-6 w-6"
					on:click={() => store.remove(todo)}
					aria-label="Remove"
				>
					X
				</button>
			</label>
		</li>
	{/each}
</ul>

<style>
	li.done {
		opacity: 0.7;
	}
</style>