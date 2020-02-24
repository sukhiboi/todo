const fs = require('fs');
const Todos = require('./todos');
const Todo = require('./todo');
const Task = require('./task');
const User = require('./user');
const { DATA_STORE_PATH, USERS_PATH } = require(`${__dirname}/../config.js`);

const saveDataStore = function(store) {
  fs.writeFile(DATA_STORE_PATH, store, () => {});
};

const getTodos = function(req, res, next) {
  const userTodos = req.app.locals.store.store[req.username];
  res.set('Content-Type', 'application/json');
  res.end(JSON.stringify(userTodos));
};

const createTodo = function(req, res, next) {
  const { todoName } = req.body;
  const { store } = req.app.locals;
  const id = `todo${new Date().getTime()}`;
  const userTodos = req.app.locals.store.store[req.username];
  userTodos.addTodo(new Todo(todoName, new Date(), [], id));
  res.set('Content-Type', 'application/json');
  res.end(JSON.stringify(userTodos));
  saveDataStore(JSON.stringify(store));
};

const editTodoTitle = function(req, res, next) {
  const { store } = req.app.locals;
  const { title, todoId } = req.body;
  const userTodos = req.app.locals.store.store[req.username];
  userTodos.editTodoTitle(todoId, title);
  res.set('Content-Type', 'application/json');
  res.end(JSON.stringify(userTodos));
  saveDataStore(JSON.stringify(store));
};

const deleteTodo = function(req, res, next) {
  const { store } = req.app.locals;
  const { todoId } = req.body;
  const userTodos = req.app.locals.store.store[req.username];
  userTodos.deleteTodo(todoId);
  res.set('Content-Type', 'application/json');
  res.end(JSON.stringify(userTodos));
  saveDataStore(JSON.stringify(store));
};

const createTask = function(req, res, next) {
  const { store } = req.app.locals;
  const { taskName, todoId } = req.body;
  const id = `task${new Date().getTime()}`;
  const task = new Task(taskName, new Date(), id);
  const userTodos = req.app.locals.store.store[req.username];
  userTodos.addTask(todoId, task);
  res.set('Content-Type', 'application/json');
  res.end(JSON.stringify(userTodos));
  saveDataStore(JSON.stringify(store));
};

const editTaskCaption = function(req, res, next) {
  const { store } = req.app.locals;
  const { caption, taskId } = req.body;
  const userTodos = req.app.locals.store.store[req.username];
  userTodos.editTaskCaption(taskId, caption);
  res.set('Content-Type', 'application/json');
  res.end(JSON.stringify(userTodos));
  saveDataStore(JSON.stringify(store));
};

const editTaskStatus = function(req, res, next) {
  const { store } = req.app.locals;
  const { taskId } = req.body;
  const userTodos = req.app.locals.store.store[req.username];
  userTodos.editTaskStatus(taskId);
  res.set('Content-Type', 'application/json');
  res.end(JSON.stringify(userTodos));
  saveDataStore(JSON.stringify(store));
};

const deleteTask = function(req, res, next) {
  const { store } = req.app.locals;
  const { taskId } = req.body;
  const userTodos = req.app.locals.store.store[req.username];
  userTodos.deleteTask(taskId);
  res.set('Content-Type', 'application/json');
  res.end(JSON.stringify(userTodos));
  saveDataStore(JSON.stringify(store));
};

const logoutHandler = function(req, res, next) {
  const { sessions } = req.app.locals;
  const { sessionId } = req.cookies;
  const removed = sessions.removeSession(sessionId);
  if (!removed) return res.json({ errMsg: 'User not found' });
  res.clearCookie('sessionId');
  res.json({ msg: 'Logged out' });
};

const signupHandler = function(req, res, next) {
  const { userName, password } = req.body;
  const allUsers = req.app.locals.allUsers;
  const store = req.app.locals.store;
  const isUserExists = allUsers.findUser(userName);
  if (isUserExists) {
    res.json({ validUser: false, errMsg: 'Username already exists' });
    return;
  }
  const user = new User(userName, password);
  allUsers.addUser(user);
  store.addTodos(userName, new Todos());
  fs.writeFile(USERS_PATH, JSON.stringify(allUsers), () => {});
  saveDataStore(JSON.stringify(store));
  res.json({ signedUp: true });
};

const loginHandler = function(req, res, next) {
  const { userName, password } = req.body;
  const { store, sessions, allUsers } = req.app.locals;
  const user = allUsers.findUser(userName);
  if (user && user.verifyPassword(password)) {
    const sessionId = new Date().getTime();
    sessions.createSession(sessionId, userName);
    res.cookie('sessionId', sessionId);
    res.json({ validUser: true, user });
    return;
  }
  res.json({ validUser: false, errMsg: 'Username or Password is incorrect' });
};

const validateSession = function(req, res, next) {
  const { sessions } = req.app.locals;
  const { sessionId } = req.cookies;
  const username = sessions.findUser(sessionId);
  if (username) {
    req.username = username;
    return next();
  }
  res.status(203).end(JSON.stringify({ errMsg: 'Session Expired' }));
};

module.exports = {
  getTodos,
  createTask,
  createTodo,
  deleteTask,
  deleteTodo,
  editTaskCaption,
  editTaskStatus,
  editTodoTitle,
  loginHandler,
  validateSession,
  signupHandler,
  logoutHandler
};
