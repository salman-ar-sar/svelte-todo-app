import { writable } from 'svelte/store';

type InitialTodo = {
	done: boolean;
	description: string;
};

export type Todo = InitialTodo & {
	id: number;
};

export type TodoStore = ReturnType<typeof createTodoStore>;

export function createTodoStore(initial: InitialTodo[]) {
	let uid = 1;

	const todos: Todo[] = initial.map(({ done, description }) => {
		return {
			id: uid++,
			done,
			description
		};
	});

	const { subscribe, update } = writable(todos);

	return {
		subscribe,
		add: (description: string) => {
			const todo = {
				id: uid++,
				done: false,
				description
			};

			update(($todos) => [...$todos, todo]);
		},
		remove: (todo: Todo) => {
			update(($todos) => $todos.filter((t) => t !== todo));
		},
		mark: (todo: Todo, done: boolean) => {
			update(($todos) => [...$todos.filter((t) => t !== todo), { ...todo, done }]);
		}
	};
}
