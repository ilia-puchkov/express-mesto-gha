const cardRouter = require('express').Router();
const { getAllCards, createCard, deleteCard, addCardLike, deleteCardLike} = require('../controllers/cards');

cardRouter.get('/', getAllCards);
cardRouter.post('/', createCard);
cardRouter.delete('/:cardId', deleteCard);
cardRouter.put('cards/:cardId/likes', addCardLike);
cardRouter.delete('cards/:cardId/likes', deleteCardLike);

module.exports = cardRouter;