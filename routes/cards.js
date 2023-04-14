const cardRouter = require('express').Router();
const {
  getAllCards,
  createCard,
  deleteCard,
  addCardLike,
  deleteCardLike,
} = require('../controllers/cards');

cardRouter.get('/', getAllCards);
cardRouter.post('/', createCard);
cardRouter.delete('/:cardId', deleteCard);
cardRouter.put('/:cardId/likes', addCardLike);
cardRouter.delete('/:cardId/likes', deleteCardLike);

module.exports = cardRouter;
