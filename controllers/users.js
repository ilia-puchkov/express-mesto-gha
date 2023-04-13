const User = require('../models/user');
const { checkError } = require('../utils/checkError');

// GET
const getAllUsers = (req, res) => {
  User.find({})
  .then((users) => {
    res.send(users);
  })
  .catch((err) => {
    checkError(err, res);
  })
};

// GET (by id)
const getUserById = (req, res) => {
  const {userId} = req.params;

  User.findById(userId)
  .then((user) => {
    if (user) res.send(user);
  })
  .catch((err) => {
    checkError(err, res);
  })
};

// POST
const createUser = (req, res) => {
  const {name, about, avatar} = req.body;

  User.create({name, about, avatar})
  .then((user) => {
    res.send(user)
  })
  .catch((err) => {
    checkError(err, res);
  })
};

// Patch (user)
const updateUserProfile = (req, res) => {
  const {_id} = req.user;
  const {name, about} = req.body;

  User.findByIdAndUpdate(_id, {name,about}, {new: true, runValidators: true})
  .then((user) => {
    if (user) res.send(user);
  })
  .catch((err) => {
    checkError(err, res);
  })
};

// Patch (avatar)
const updateUserAvatar = (req, res) => {
  const {_id} = req.user;
  const {avatar} = req.body;

  User.findByIdAndUpdate(_id, {avatar}, {new: true, runValidators: true})
  .then((user) => {
    if (user) res.send(user);
  })
  .catch((err) => {
    checkError(err, res);
  })
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUserProfile,
  updateUserAvatar
}