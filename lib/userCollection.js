const User = require('./user');

class UserCollection {
  constructor() {
    this.users = {};
  }
  addUser(user) {
    const isInstance = user instanceof User;
    if (isInstance) {
      this.users[user.name] = user;
    }
    return isInstance;
  }
  findUser(username) {
    return this.users[username];
  }
  deleteUser(username) {
    delete this.users[username];
    return this.users;
  }
  toJSON() {
    return { ...this.users };
  }
  static load(rawUserContent) {
    const usersDetail = JSON.parse(rawUserContent || '{}');
    const userCollection = new UserCollection();
    for (const username in usersDetail) {
      const { name, password } = usersDetail[username];
      const user = new User(name, password);
      userCollection.addUser(user);
    }
    return userCollection;
  }
}

module.exports = UserCollection;
