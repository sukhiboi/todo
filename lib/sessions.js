class Sessions {
  constructor() {
    this.list = [];
  }
  createSession(id, username) {
    const isValid = Boolean(id && username);
    if (isValid) {
      this.list.push({
        username,
        id
      });
    }
    return isValid;
  }
  findUser(sessionId) {
    const session = this.list.find(session => session.id == sessionId);
    return session && session.username;
  }
  removeSession(sessionId) {
    const foundedSession = this.list.find(session => session.id == sessionId);
    const index = this.list.indexOf(foundedSession);
    const isValidIndex = index > -1;
    if (isValidIndex) this.list.splice(index, 1);
    return isValidIndex;
  }
}
module.exports = Sessions;
