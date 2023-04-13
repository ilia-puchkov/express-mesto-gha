const BAD_REQUEST_ERROR = 400;
const NOT_FOUND_ERROR = 404;
const SERVER_ERROR = 500;

const checkError = (err, res) => {
  if (err.name === 'ValidationError') {
    return res.status(BAD_REQUEST_ERROR).send({ message: 'Переданы некорректные данные' });
  }
  if (err.name === 'CastError') {
    return res.status(BAD_REQUEST_ERROR).send({ message: 'Переданы некорректные данные' });
  }
  if (err.name === 'DocumentNotFoundError') {
    return res.status(NOT_FOUND_ERROR).send({ message: 'Данные не найдены' });
  }
  return res.status(SERVER_ERROR).send({ message: 'Ошибка сервера' });
};

module.exports = checkError;