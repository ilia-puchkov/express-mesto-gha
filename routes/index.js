const router = require('express').Router();
const { auth } = require('../middlewares/auth');

const { createUser, login } = require('../controllers/users');
const { validateAuth, validateRegistration } = require('../middlewares/validation');

const userRouter = require('./users');
const cardRouter = require('./cards');

const NotFoundError = require('../errors/NotFoundError');

router.post('/signin', validateAuth, login);
router.post('/signup', validateRegistration, createUser);

router.use(auth);
router.use('/users', userRouter);
router.use('/cards', cardRouter);

router.use((req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

module.exports = router;
