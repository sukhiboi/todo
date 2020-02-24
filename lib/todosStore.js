const Todos = require('./todos');

class TodosStore {
  constructor() {
    this.store = {};
  }
  addTodos(username, todos) {
    const isInstance = todos instanceof Todos;
    if (isInstance) {
      this.store[username] = todos;
    }
    return isInstance;
  }
  findTodos(username) {
    return this.store[username];
  }
  deleteTodos(username) {
    delete this.store[username];
    return this.store;
  }
  toJSON() {
    return { ...this.store };
  }
  static load(rawTodosContent) {
    const todosContent = JSON.parse(rawTodosContent || '{}');
    const todosStore = new TodosStore();
    for (const username in todosContent) {
      const rawTodos = todosContent[username];
      const todos = Todos.initialize(rawTodos);
      todosStore.addTodos(username, todos);
    }
    return todosStore;
  }
}

module.exports = TodosStore;
