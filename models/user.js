const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const regexUrl = require('../utils/regexUrl');

const UnauthorizedError = require('../errors/UnauthorizedError');

const userSchema = mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: 'Неправильный формат почты',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
    minlength: 8,
  },
  name: {
    type: String,
    minLength: 2,
    maxLength: 30,
    required: false,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minLength: 2,
    maxLength: 30,
    required: false,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    required: false,
    default:
      'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator: (v) => regexUrl.test(v),
      message: 'Неверный адрес ссылки',
    },
  },
});

userSchema.statics.findUserByCredentials = (email, password) => {
  return this.findOne({ email }).then((user) => {
    if (!user) {
      return Promise.reject(new UnauthorizedError('Неправильные почта или пароль'));
    }

    return bcrypt.compare(password, user.password).then((matched) => {
      if (!matched) {
        return Promise.reject(new UnauthorizedError('Неправильные почта или пароль'));
      }

      return user;
    });
  });
};

module.exports = mongoose.model('user', userSchema);
