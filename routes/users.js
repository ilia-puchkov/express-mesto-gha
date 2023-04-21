const userRouter = require('express').Router();
const {
  getAllUsers,
  getUserById,
  getCurrentUser,
  updateUserProfile,
  updateUserAvatar,
} = require('../controllers/users');

userRouter.get('/', getAllUsers);
userRouter.get('/:userId', getUserById);
userRouter.get('./users/me', getCurrentUser);
userRouter.patch('/me', updateUserProfile);
userRouter.patch('/me/avatar', updateUserAvatar);

module.exports = userRouter;
