const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const router = require('./routes');

const { createUser, login } = require('./controllers/users');
const { auth } = require('./middlewares/auth');
const { validateAuth, validateRegistration } = require('./middlewares/validation');

const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(router);
app.post('/signin', validateAuth, login);
app.post('/signup', validateRegistration, createUser);

app.use(errors());
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500
      ? 'Ошибка сервера'
      : message,
  });
  next();
});
app.use(auth);
app.use(helmet);

app.listen(PORT, () => {
// eslint-disable-next-line no-console
  console.log(`server on port ${PORT}`);
});
