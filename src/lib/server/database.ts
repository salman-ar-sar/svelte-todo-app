const database = new Map();

export function getTodos(userid: string) {
	if (!database.has(userid)) {
		createTodo({ userid, description: 'Learn about API routes' });
	}

	return Array.from(database.get(userid).values()) as PersistedTodo[];
}

export type PersistedTodo = {
	id: string;
	description: string;
	done: boolean;
};

type TodoRequest = PersistedTodo & {
	userid: string;
};

export function createTodo({ userid, description }: Pick<TodoRequest, 'userid' | 'description'>) {
	if (!database.has(userid)) {
		database.set(userid, new Map());
	}

	const todos = database.get(userid);

	const id = crypto.randomUUID();

	todos.set(id, {
		id,
		description,
		done: false,
	});

	return {
		id,
	};
}

export function toggleTodo({ userid, id, done }: Pick<TodoRequest, 'userid' | 'id' | 'done'>) {
	const todos = database.get(userid);
	todos.get(id).done = done;
}

export function deleteTodo({ userid, id }: Pick<TodoRequest, 'userid' | 'id'>) {
	const todos = database.get(userid);
	todos.delete(id);
}
