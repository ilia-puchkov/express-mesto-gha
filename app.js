/* eslint-disable linebreak-style */
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
const router = require('./routes');
const cors = require('./middlewares/cors');

const { customError } = require('./middlewares/customError');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;
const app = express();

app.use(helmet());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useUnifiedTopology: true,
});

app.use(requestLogger);

app.use(cors);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(router);

app.use(errorLogger);
app.use(errors());
app.use(customError);

app.listen(PORT, () => {
// eslint-disable-next-line no-console
  console.log(`server on port ${PORT}`);
});
