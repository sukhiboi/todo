const assert = require('chai').assert;
const sinon = require('sinon');
const Sessions = require('./../lib//sessions');

describe('Sessions', () => {
  let sessions;

  beforeEach(function() {
    sessions = new Sessions();
  });

  describe('createSession', () => {
    it('should create a session for user', () => {
      const result = sessions.createSession(1, 'ram');
      assert.isTrue(result);
    });
  });

  describe('findUser', () => {
    it('should give back username when sessionId is valid', () => {
      sessions.createSession(1, 'ram');
      const result = sessions.findUser(1);
      assert.strictEqual(result, 'ram');
    });
    it('should give back undefined when sessionId is not valid', () => {
      sessions.createSession(1, 'ram');
      const result = sessions.findUser(14);
      assert.isUndefined(result);
    });
  });

  describe('removeSesssion', () => {
    it('should remove a session with sessionId', () => {
      sessions.createSession(1, 'ram');
      const result = sessions.removeSession(1);
      assert.isTrue(result);
    });

    it('should not remove a session when sessionId not found', () => {
      sessions.createSession(1, 'ram');
      const result = sessions.removeSession(14);
      assert.isFalse(result);
    });
  });
});
