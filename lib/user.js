class User {
  constructor(name, password) {
    this.name = name;
    this.password = password;
  }
  verifyPassword(password) {
    return this.password === password;
  }
  toJSON() {
    return { ...this };
  }
}

module.exports = User;
