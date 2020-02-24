const assert = require('chai').assert;
const Todo = require('./../lib/todo');
const Todos = require('./../lib/todos');
const TodosStore = require('./../lib/todosStore');

describe('todosStore', () => {
  let todos;
  let todosStore;

  beforeEach(function() {
    todos = new Todos();
    todosStore = new TodosStore();
  });

  describe('addTodos', () => {
    it('should add a given todos with given username and say true', () => {
      const result = todosStore.addTodos('ram', todos);
      assert.isTrue(result);
    });
    it('should not add anything which is not Todos and say false', () => {
      const fakeTodos = { list: [] };
      const result = todosStore.addTodos(fakeTodos);
      assert.isFalse(result);
    });
  });
  describe('findTodos', () => {
    it('should find the Todos with given username', () => {
      todosStore.addTodos('ram', todos);
      const foundedTodos = todosStore.findTodos('ram');
      assert.deepStrictEqual(todos, foundedTodos);
    });
    it('should say undefined if user is not present', () => {
      const todosStore = new TodosStore();
      assert.isUndefined(todosStore.findTodos('ramu'));
    });
  });
  describe('deleteTodos', () => {
    it('should delete the todos of the given user', () => {
      const todos2 = new Todos();
      todos2.addTodo(new Todo('Home', new Date(), [], 'todo1'));
      todosStore.addTodos('ram', todos);
      todosStore.addTodos('ramu', todos2);
      const store = todosStore.deleteTodos('ram');
      assert.deepStrictEqual(store, { ramu: todos2 });
    });
    it('should not delete the todos when user is not present', () => {
      const todos2 = new Todos();
      todos2.addTodo(new Todo('Home', new Date(), [], 'todo1'));
      todosStore.addTodos('ram', todos);
      todosStore.addTodos('ramu', todos2);
      const store = todosStore.deleteTodos('unknown');
      assert.deepStrictEqual(store, { ramu: todos2, ram: todos });
    });
  });
  describe('load', () => {
    it('should load raw users and give TodosStore', () => {
      const rawTodosStore = '{"ram":[]}';
      const todosStore = TodosStore.load(rawTodosStore);
      assert.isTrue(todosStore instanceof TodosStore);
      assert.isTrue(todosStore.store.ram instanceof Todos);
    });
  });

  describe('toJSON', () => {
    it('should give the JSON representation', () => {
      todosStore.addTodos('ram', todos);
      assert.deepStrictEqual(todosStore.store, { ram: { list: [] } });
    });
  });
});
