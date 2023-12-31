const Joi = require('joi');

const { emailRegexp } = require('../constants/user');

const UserRegisterSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

const UserLoginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});
const UserEmailSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
});
module.exports = { UserRegisterSchema, UserLoginSchema, UserEmailSchema };
