const redis = require('redis');
const client = redis.createClient({ port: process.env.REDIS_URL });
const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const Sessions = require('./sessions');
const TodosStore = require('./todosStore');
const handlers = require('./handlers');
const UserCollection = require('./userCollection');

const loadContent = function(key, cb) {
  client.get(key, (err, data) => cb(data));
};

const rawUsersCollection = loadContent('users', data => data);
const rawDataStore = loadContent('store', data => data);

const app = express();
app.use(express.static(`${__dirname}/../public`));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));

app.locals.allUsers = UserCollection.load(rawUsersCollection);
app.locals.store = TodosStore.load(rawDataStore);
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
