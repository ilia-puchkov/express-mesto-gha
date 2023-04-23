const cardRouter = require('express').Router();

const {
  getAllCards,
  createCard,
  deleteCard,
  addCardLike,
  deleteCardLike,
} = require('../controllers/cards');

const { validateCard, validateCardId } = require('../middlewares/validation');

cardRouter.get('/', getAllCards);
cardRouter.post('/', validateCard, createCard);
cardRouter.delete('/:cardId', validateCardId, deleteCard);
cardRouter.put('/:cardId/likes', validateCardId, addCardLike);
cardRouter.delete('/:cardId/likes', validateCardId, deleteCardLike);

module.exports = cardRouter;
