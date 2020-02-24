const assert = require('chai').assert;
const Task = require('./../lib/task');
const Todo = require('./../lib/todo');

let date;

beforeEach(function() {
  date = new Date();
});

describe('Todo', function() {
  describe('addTask', function() {
    it('should add a task', function() {
      const task = new Task('buy shampoo', date, 'task1', true);
      const todo = new Todo('Home', date, [], 'todo1');
      const tasks = todo.addTask(task);
      assert.deepStrictEqual(tasks, [task]);
    });
  });
  describe('findTask', function() {
    it('should find a task with a given id', function() {
      const task1 = new Task('buy shampoo', date, 'task1', true);
      const task2 = new Task('buy dove shampoo', date, 'task2', false);
      const todo = new Todo('Home', date, [], 'todo1');
      todo.addTask(task1);
      todo.addTask(task2);
      const foundedTask = todo.findTask('task2');
      assert.deepStrictEqual(foundedTask, task2);
    });

    it('should give undefined when the given id is not found', function() {
      const task1 = new Task('buy shampoo', date, 'task1', true);
      const task2 = new Task('buy dove shampoo', date, 'task2', false);
      const todo = new Todo('Home', date, [], 'todo1');
      todo.addTask(task1);
      todo.addTask(task2);
      const foundedTask = todo.findTask('task90');
      assert.isUndefined(foundedTask);
    });
  });
  describe('editTaskCaption', function() {
    it('should edit the caption of the task with matching taskId', function() {
      const task1 = new Task('buy shampoo', date, 'task1', true);
      const todo = new Todo('Home', date, [], 'todo1');
      todo.addTask(task1);
      const result = todo.editTaskCaption('task1', 'buy dove shampoo');
      assert.isTrue(result);
    });

    it("should not edit the caption of the task which doesn't match the taskId", function() {
      const task1 = new Task('buy shampoo', date, 'task1', true);
      const todo = new Todo('Home', date, [], 'todo1');
      todo.addTask(task1);
      const result = todo.editTaskCaption('task11', 'buy dove shampoo');
      assert.isFalse(result);
    });
  });
  describe('editTaskStatus', function() {
    it('should toggle the status of the task with matching taskId', function() {
      const task1 = new Task('buy shampoo', date, 'task1', true);
      const todo = new Todo('Home', date, [], 'todo1');
      todo.addTask(task1);
      const result = todo.editTaskStatus('task1');
      assert.isTrue(result);
    });

    it("should not toggle the status of the task which doesn't match the taskId", function() {
      const task1 = new Task('buy shampoo', date, 'task1', false);
      const todo = new Todo('Home', date, [], 'todo1');
      todo.addTask(task1);
      const result = todo.editTaskStatus('task12');
      assert.isFalse(result);
    });
  });
  describe('deleteTask', function() {
    it('should delete the task with matching taskId', function() {
      const task1 = new Task('buy shampoo', date, 'task1', true);
      const task2 = new Task('buy dove shampoo', date, 'task2', false);
      const todo = new Todo('Home', date, [], 'todo1');
      todo.addTask(task1);
      todo.addTask(task2);
      const tasks = todo.deleteTask('task1');
      assert.deepStrictEqual(tasks, [task2]);
    });

    it("should NOT delete any other tasks when taskId doesn't found", function() {
      const task1 = new Task('buy shampoo', date, 'task1', true);
      const task2 = new Task('buy dove shampoo', date, 'task2', false);
      const todo = new Todo('Home', date, [], 'todo1');
      todo.addTask(task1);
      todo.addTask(task2);
      const tasks = todo.deleteTask('task11');
      assert.deepStrictEqual(tasks, [task1, task2]);
    });
  });
  describe('editTitle', function() {
    it('should edit the title of the todo', function() {
      const todo = new Todo('Home', date, [], 'todo1');
      const newTitle = todo.editTitle('new Title');
      assert.strictEqual(newTitle, 'new Title');
    });
  });
  describe('toJSON', function() {
    it('should give json string of its own data', function() {
      const todo = new Todo('Home', date, [], 'todo1');
      const task = new Task('Buy shampoo', date, 'task1');
      todo.addTask(task);
      const expected = {
        fromDate: date,
        title: 'Home',
        id: 'todo1',
        tasks: [
          { caption: 'Buy shampoo', fromDate: date, id: 'task1', done: false }
        ]
      };
      assert.deepStrictEqual(todo.toJSON(), expected);
    });
  });
});
