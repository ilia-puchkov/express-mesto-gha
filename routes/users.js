const userRouter = require('express').Router();

const {
  getAllUsers,
  getUserById,
  getCurrentUser,
  updateUserProfile,
  updateUserAvatar,
} = require('../controllers/users');

const {
  validateUser,
  validateUsedId,
  validateAvatar,
} = require('../middlewares/validation');

userRouter.get('/', getAllUsers);
userRouter.get('/me', getCurrentUser);
userRouter.get('/:userId', validateUsedId, getUserById);
userRouter.patch('/me', validateUser, updateUserProfile);
userRouter.patch('/me/avatar', validateAvatar, updateUserAvatar);

module.exports = userRouter;
