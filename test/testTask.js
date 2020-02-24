const assert = require('chai').assert;
const Task = require('./../lib/task');

let date;

beforeEach(function() {
  date = new Date();
});

describe('Task class', function () {
  describe('editCaption', function() {
    it('should edit the caption of the Task', function() {
      const task = new Task('buy milk', date, 'task1');
      const newCaption = task.editCaption('buy shampoo');
      assert.strictEqual(newCaption, 'buy shampoo');
    });
  });
  describe('toggleStatus', function() {
    it('should change the status to done when it is inComplete', function() {
      const task = new Task('buy milk', date, 'task1');
      const newStatus = task.toggleStatus();
      assert.isTrue(newStatus);
    });
    it('should change the status to undone when it is complete', function() {
      const task = new Task('buy milk', date, 'task1', true);
      const newStatus = task.toggleStatus();
      assert.isFalse(newStatus);
    });
  });
  describe('toJSON', function() {
    it('should generate JSON Object', function() {
      const task = new Task('buy milk', date, 'task1');
      assert.deepStrictEqual(task.toJSON(), {
        caption: 'buy milk',
        id: 'task1',
        fromDate: date,
        done: false
      });
    });
  });
});
