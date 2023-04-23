const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
const router = require('./routes');

const { createUser, login } = require('./controllers/users');
const { auth } = require('./middlewares/auth');
const { validateAuth, validateRegistration } = require('./middlewares/validation');
const { customError } = require('./middlewares/customError');

const { PORT = 3000 } = process.env;
const app = express();

app.use(helmet);
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useUnifiedTopology: true,
});

app.use(router);
app.post('/signin', validateAuth, login);
app.post('/signup', validateRegistration, createUser);

app.use(auth);
app.use(errors());
app.use(customError);

app.listen(PORT, () => {
// eslint-disable-next-line no-console
  console.log(`server on port ${PORT}`);
});
