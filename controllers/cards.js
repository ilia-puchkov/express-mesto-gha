const Card = require('../models/card');
const {
  BAD_REQUEST_ERROR,
  NOT_FOUND_ERROR,
  SERVER_ERROR,
} = require('../utils/errorStatus');

// Get
const getAllCards = (req, res) => {
  Card.find({})
    // .populate('owner')
    .then((cards) => {
      res.send(cards);
    })
    .catch(() => res.status(SERVER_ERROR).send({ message: 'Ошибка сервера' }));
};

// Post
const createCard = (req, res) => {
  const { _id } = req.user._id;
  const { name, link } = req.body;

  Card.create({ name, link, owner: _id })
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res
          .status(BAD_REQUEST_ERROR)
          .send({ message: 'Переданы некорректные данные' });
      }
      return res.status(SERVER_ERROR).send({ message: 'Ошибка сервера' });
    });
};

// Delete
const deleteCard = (req, res) => {
  const { cardId } = req.params;

  Card.findByIdAndRemove(cardId)
    .then(() => res.status(NOT_FOUND_ERROR).send({ message: 'Данные не найдены' }))
    .catch((err) => {
      if (err.name === 'CastError') {
        return res
          .status(BAD_REQUEST_ERROR)
          .send({ message: 'Переданы некорректные данные' });
      }
      return res.status(SERVER_ERROR).send({ message: 'Ошибка сервера' });
    });
};

// Put (like)
const addCardLike = (req, res) => {
  const { _id } = req.user._id;
  const { cardId } = req.params;

  Card.findByIdAndUpdate(cardId, { $addToSet: { likes: _id } }, { new: true })
    .then((card) => {
      if (card) {
        return res.send(card);
      }
      return res.status(NOT_FOUND_ERROR).send({ message: 'Данные не найдены' });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res
          .status(BAD_REQUEST_ERROR)
          .send({ message: 'Переданы некорректные данные' });
      }
      return res.status(SERVER_ERROR).send({ message: 'Ошибка сервера' });
    });
};

// Delete (like)
const deleteCardLike = (req, res) => {
  const { _id } = req.user._id;
  const { cardId } = req.params;

  Card.findByIdAndUpdate(cardId, { $pull: { likes: _id } }, { new: true })
    .then((card) => {
      if (card) {
        return res.send(card);
      }
      return res.status(NOT_FOUND_ERROR).send({ message: 'Данные не найдены' });
    })
    .catch(() => res.status(SERVER_ERROR).send({ message: 'Ошибка сервера' }));
};

module.exports = {
  getAllCards,
  createCard,
  deleteCard,
  addCardLike,
  deleteCardLike,
};
