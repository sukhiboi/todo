const assert = require('chai').assert;
const sinon = require('sinon');
const User = require('./../lib/user');

describe('User', () => {
  describe('verify password', () => {
    it('should say true for valid password', () => {
      const user = new User('ram', 123);
      assert.isTrue(user.verifyPassword(123));
    });
  });

  describe('toJSON  ', () => {
    it('should return the JSON representation', () => {
      const user = new User('sukhi', 123);
      assert.deepStrictEqual(user.toJSON(), {
        name: 'sukhi',
        password: 123
      });
    });
  });
});
