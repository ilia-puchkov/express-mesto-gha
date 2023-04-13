const Card = require('../models/card');
const { checkError } = require('../utils/checkError');

//Get
const getAllCards = (req, res) => {
  Card.find({})
    .populate('owner')
    .then((cards) => {
      res.send(cards);
    })
    .catch((err) => {
      checkError(err, res);
    })
};

// Post
const createCard = (req, res) => {
  const {_id} = req.user;
  const {name, link} = req.body;

  Card.create({name, link, owner:_id})
    .then((card) => {
      res.send(card);
    })
    .catch((err)=> {
      checkError(err, res);
    })
};

// Delete
const deleteCard = (req, res) => {
  const { cardId } = req.params;

  Card.findByIdAndRemove(cardId)
    .then((card) => {
      //проверка ID
      res.send(card);
    })
    .catch((err) => {
      checkError(err, res);
    })
};

// Put (like)
const addCardLike = (req, res) => {
  const {_id} = req.user;
  const {cardId} = req.params;

  Card.findByIdAndUpdate(cardId, { $addToSet: {likes: _id}}, {new: true})
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      checkError(err, res);
    })
};

// Delete (like)
const deleteCardLike = (req, res) => {
  const {_id} = req.user;
  const {cardId} = req.params;

  Card.findByIdAndUpdate(cardId, { $pull: {likes: _id}}, {new: true})
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      checkError(err, res);
    })
};

module.exports = {
  getAllCards,
  createCard,
  deleteCard,
  addCardLike,
  deleteCardLike
}