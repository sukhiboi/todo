const assert = require('chai').assert;
const User = require('./../lib/user');
const sinon = require('sinon');
const UserCollection = require('./../lib/userCollection');

describe('userCollection', () => {
  describe('addUser', () => {
    it('should add a given User and say true', () => {
      const user = new User('ram', 123);
      const userCollection = new UserCollection();
      const result = userCollection.addUser(user);
      assert.isTrue(result);
    });
    it('should not add anything which is not User and say false', () => {
      const userInfo = { name: 'ram', password: 123 };
      const userCollection = new UserCollection();
      const result = userCollection.addUser(userInfo);
      assert.isFalse(result);
    });
  });
  describe('findUser', () => {
    it('should find the user and give user when user is present', () => {
      const user = new User('ram', 123);
      const userCollection = new UserCollection();
      userCollection.addUser(user);
      const foundedUser = userCollection.findUser('ram');
      assert.deepStrictEqual(user, foundedUser);
    });
    it('should say undefined if user is not present', () => {
      const userCollection = new UserCollection();
      assert.isUndefined(userCollection.findUser('ram'));
    });
  });
  describe('deleteUser', () => {
    it('should delete the user and give users when user is present', () => {
      const user1 = new User('ram', 123);
      const user2 = new User('ramu', 1234);
      const userCollection = new UserCollection();
      userCollection.addUser(user1);
      userCollection.addUser(user2);
      const users = userCollection.deleteUser('ram');
      assert.deepStrictEqual(users, { ramu: user2 });
    });
    it('should not delete the user and give users when user is not present', () => {
      const user1 = new User('ram', 123);
      const user2 = new User('ramu', 1234);
      const userCollection = new UserCollection();
      userCollection.addUser(user1);
      userCollection.addUser(user2);
      const users = userCollection.deleteUser('unknown');
      assert.deepStrictEqual(users, { ramu: user2, ram: user1 });
    });
  });
  describe('load', () => {
    it('should load raw users and give UserCollection', () => {
      const rawUsers =
        '{"ram":{"name":"ram","password":123},"ramu":{"name":"ramu","password":1234}}';
      const userCollection = UserCollection.load(rawUsers);
      assert.isTrue(userCollection instanceof UserCollection);
      assert.isTrue(userCollection.users.ram instanceof User);
      assert.isTrue(userCollection.users.ramu instanceof User);
    });
  });

  describe('toJSON', () => {
    it('should give the JSON representation', () => {
      const user = new User('ram', '234');
      const userCollection = new UserCollection();
      userCollection.addUser(user);
      assert.deepStrictEqual(userCollection.toJSON(), {
        ram: {
          name: 'ram',
          password: '234'
        }
      });
    });
  });
});
