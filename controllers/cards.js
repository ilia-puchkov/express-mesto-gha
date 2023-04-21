const Card = require('../models/card');

const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');

// Get
const getAllCards = (req, res) => {
  Card.find({})
    // .populate('owner')
    .then((cards) => {
      res.send(cards);
    })
    .catch(next);
};

// Post
const createCard = (req, res) => {
  const { _id } = req.user;
  const { name, link } = req.body;

  Card.create({ name, link, owner: _id })
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('Переданы некорректные данные'));
      }
      return next(err);
    });
};

// Delete
const deleteCard = (req, res) => {
  const { cardId } = req.params;

  Card.findByIdAndRemove(cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Данные не найдены');
      }
      return res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
          return next(new BadRequestError('Переданы некорректные данные'));
        }
        return next(err);
    });
};

// Put (like)
const addCardLike = (req, res) => {
  const { _id } = req.user;
  const { cardId } = req.params;

  Card.findByIdAndUpdate(cardId, { $addToSet: { likes: _id } }, { new: true })
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Данные не найдены');
      }
      return res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
          return next(new BadRequestError('Переданы некорректные данные'));
        }
        return next(err);
    });
};

// Delete (like)
const deleteCardLike = (req, res) => {
  const { _id } = req.user;
  const { cardId } = req.params;

  Card.findByIdAndUpdate(cardId, { $pull: { likes: _id } }, { new: true })
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Данные не найдены');
      }
      return res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
          return next(new BadRequestError('Переданы некорректные данные'));
        }
        return next(err);
    });
};

module.exports = {
  getAllCards,
  createCard,
  deleteCard,
  addCardLike,
  deleteCardLike,
};
