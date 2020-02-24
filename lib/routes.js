const redis = require('redis');
const client = redis.createClient(
  process.env.REDIS_URL || 'http://localhost:6379'
);
const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const Sessions = require('./sessions');
const TodosStore = require('./todosStore');
const handlers = require('./handlers');
const UserCollection = require('./userCollection');

const app = express();
app.use(express.static(`${__dirname}/../public`));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));

client.get('users', (err, data) => {
  app.locals.allUsers = UserCollection.load(data);
});

client.get('store', (err, data) => {
  app.locals.store = TodosStore.load(data);
});

app.locals.sessions = new Sessions();

app.post('/logout', handlers.logoutHandler);
app.post('/signup', handlers.signupHandler);
app.post('/login', handlers.loginHandler);
app.use(handlers.validateSession);
app.get('/getTodos', handlers.getTodos);
app.post('/createTodo', handlers.createTodo);
app.post('/editTodoTitle', handlers.editTodoTitle);
app.post('/deleteTodo', handlers.deleteTodo);
app.post('/createTask', handlers.createTask);
app.post('/editTaskCaption', handlers.editTaskCaption);
app.post('/editTaskStatus', handlers.editTaskStatus);
app.post('/deleteTask', handlers.deleteTask);

module.exports = app;
