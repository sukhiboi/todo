const assert = require('chai').assert;
const sinon = require('sinon');
const Task = require('./../lib/task');
const Todo = require('./../lib/todo');
const Todos = require('./../lib/todos');

let date;
let store;

beforeEach(function() {
  date = new Date();
  store = new Todos();
});

afterEach(function() {
  sinon.restore();
});

describe('Todos', function() {
  describe('addTodo', function() {
    it('should add a todo to the list', function() {
      const todo = new Todo('new Todo', date, [], 'todo1');
      const todos = store.addTodo(todo);
      assert.deepStrictEqual(todos, [todo]);
    });
  });
  describe('deleteTodo', function() {
    it('should delete Todo with the given Id', function() {
      const todo1 = new Todo('Home', date, [], 'todo1');
      const todo2 = new Todo('Office', date, [], 'todo2');
      store.addTodo(todo1);
      store.addTodo(todo2);
      const todos = store.deleteTodo('todo1');
      assert.deepStrictEqual(todos, [todo2]);
    });

    it('should NOT delete Todo when the given Id not found', function() {
      const todo1 = new Todo('Home', date, [], 'todo1');
      const todo2 = new Todo('Office', date, [], 'todo2');
      store.addTodo(todo1);
      store.addTodo(todo2);
      const todos = store.deleteTodo('todo18');
      assert.deepStrictEqual(todos, [todo1, todo2]);
    });
  });
  describe('findTodo', function() {
    it('should find todo with the give id', function() {
      const todo1 = new Todo('Home', date, [], 'todo1');
      const todo2 = new Todo('Office', date, [], 'todo2');
      store.addTodo(todo1);
      store.addTodo(todo2);
      const foundedTodo = store.findTodo('todo2');
      assert.deepStrictEqual(foundedTodo, todo2);
    });

    it('should give undefined when todo with given todoId not found', function() {
      const todo1 = new Todo('Home', date, [], 'todo1');
      const todo2 = new Todo('Office', date, [], 'todo2');
      store.addTodo(todo1);
      store.addTodo(todo2);
      const foundedTodo = store.findTodo('todo190');
      assert.isUndefined(foundedTodo);
    });
  });
  describe('editTodoTitle', function() {
    it('should edit the title with matching todoId', function() {
      const todo = new Todo('Home', date, [], 'todo1');
      store.addTodo(todo);
      const result = store.editTodoTitle('todo1', 'Office');
      assert.isTrue(result);
    });
    it('should not edit the title when todo not found', function() {
      const todo = new Todo('Home', date, [], 'todo1');
      store.addTodo(todo);
      const result = store.editTodoTitle('todo10', 'Office');
      assert.isFalse(result);
    });
  });
  describe('addTask', function() {
    it('should add a task', function() {
      const task = new Task('buy shampoo', date, 'task1', true);
      const todo = new Todo('Home', date, [], 'todo1');
      store.addTodo(todo);
      const result = store.addTask('todo1', task);
      assert.isTrue(result);
    });

    it('should not add a task when todo not found', function() {
      const task = new Task('buy shampoo', date, 'task1', true);
      const todo = new Todo('Home', date, [], 'todo1');
      store.addTodo(todo);
      const result = store.addTask('todo10', task);
      assert.isFalse(result);
    });
  });
  describe('findTask', function() {
    it('should find a task with a given id', function() {
      const task1 = new Task('buy shampoo', date, 'task1', true);
      const task2 = new Task('buy dove shampoo', date, 'task2', false);
      const todo = new Todo('Home', date, [], 'todo1');
      store.addTodo(todo);
      store.addTask('todo1', task1);
      store.addTask('todo1', task2);
      const foundedTask = store.findTask('task2');
      assert.deepStrictEqual(foundedTask, task2);
    });

    it('should give undefined when the given id is not found', function() {
      const task1 = new Task('buy shampoo', date, 'task1', true);
      const task2 = new Task('buy dove shampoo', date, 'task2', false);
      const todo = new Todo('Home', date, [], 'todo1');
      store.addTodo(todo);
      store.addTask('todo1', task1);
      store.addTask('todo1', task2);
      const foundedTask = store.findTask('task90');
      assert.isUndefined(foundedTask);
    });
  });
  describe('editTaskCaption', function() {
    it('should edit the caption of the task with matching taskId', function() {
      const task = new Task('buy shampoo', date, 'task1', true);
      const todo = new Todo('Home', date, [], 'todo1');
      store.addTodo(todo);
      store.addTask('todo1', task);
      const result = store.editTaskCaption('task1', 'buy dove shampoo');
      assert.isTrue(result);
    });

    it('should not edit the caption of the task when no task found', function() {
      const task = new Task('buy shampoo', date, 'task1', true);
      const todo = new Todo('Home', date, [], 'todo1');
      store.addTodo(todo);
      store.addTask('todo1', task);
      const result = store.editTaskCaption('task10', 'buy dove shampoo');
      assert.isFalse(result);
    });
  });
  describe('editTaskStatus', function() {
    it('should give true when the task is toggled', function() {
      const task = new Task('buy shampoo', date, 'task1', true);
      const todo = new Todo('Home', date, [], 'todo1');
      store.addTodo(todo);
      store.addTask('todo1', task);
      const result = store.editTaskStatus('task1');
      assert.isTrue(result);
    });

    it('should give false when task not found', function() {
      const task = new Task('buy shampoo', date, 'task1', false);
      const todo = new Todo('Home', date, [], 'todo1');
      store.addTodo(todo);
      store.addTask('todo1', task);
      const result = store.editTaskStatus('task10');
      assert.isFalse(result);
    });
  });
  describe('toJSON', function() {
    it('should give json string of its own data', function() {
      const todo = new Todo('Home', date, [], 'todo1');
      const task = new Task('Buy milk', date, 'task1');
      store.addTodo(todo);
      const testTodo = {
        fromDate: date,
        id: 'todo1',
        title: 'Home',
        tasks: [
          {
            caption: 'Buy milk',
            done: false,
            fromDate: date,
            id: 'task1'
          }
        ]
      };
      store.addTask('todo1', task);
      assert.deepStrictEqual(store.toJSON(), [testTodo]);
    });
  });
  describe.skip('deleteTask', function() {
    it('should delete the task with matching taskId', function() {
      const task = new Task('buy shampoo', date, 'task1', true);
      const task2 = new Task('buy dove shampoo', date, 'task7', false);
      const todo = new Todo('Home', date, [], 'todo1');
      const todoList = new Todos();
      todoList.addTodo(todo);
      todoList.addTask('todo1', task);
      todoList.addTask('todo1', task2);
      todoList.deleteTask('task1');
      assert.deepStrictEqual(todoList.list[0].tasks.list, [task2]);
    });

    it("should NOT delete any other tasks when taskId doesn't found", function() {
      const task = new Task('buy shampoo', date, 'task1', true);
      const task2 = new Task('buy dove shampoo', date, 'task7', false);
      const todo = new Todo('Home', date, [], 'todo1');
      const todoList = new Todos();
      todoList.addTodo(todo);
      todoList.addTask('todo1', task);
      todoList.addTask('todo1', task2);
      todoList.deleteTask('task10');
      assert.deepStrictEqual(todoList.list[0].tasks.list, [task, task2]);
    });
  });
});
