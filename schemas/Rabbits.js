const Joi = require('joi');

const rabbitSchema = Joi.object()
  .min(1)
  .keys({
    name: Joi.string().min(2).required().messages({
      'any.required': `missing required 'name' field`,
      'string.empty': `'name' cannot be an empty field`,
    }),

    breed: Joi.string().min(6).required().messages({
      'any.required': `missing required 'breed' field`,
      'string.empty': `'breed' cannot be an empty field`,
    }),
    gender: Joi.string().min(6).required().messages({
      'any.required': `missing required 'gender' field`,
      'string.empty': `'gender' cannot be an empty field`,
    }),
    dateBirthDay: Joi.string().min(6).required().messages({
      'any.required': `missing required 'dateBirthDay' field`,
      'string.empty': `'dateBirthDay' cannot be an empty field`,
    }),
    favorite: Joi.boolean(),
  });

const contactsUpdateFavoriteSchema = Joi.object()
  .min(1)
  .keys({
    favorite: Joi.boolean().required().messages({
      'any.required': `missing required 'favorite' field`,
      'string.empty': `'favorite' cannot be an empty field`,
    }),
  });

const rabbitBreedSchema = Joi.object()
  .min(1)
  .keys({
    name: Joi.string().min(2).required().messages({
      'any.required': `missing required 'name' field`,
      'string.empty': `'name' cannot be an empty field`,
    }),

    color: Joi.string().min(4).required().messages({
      'any.required': `missing required 'color' field`,
      'string.empty': `'color' cannot be an empty field`,
    }),

    about: Joi.string().messages({
      'any.required': `missing required 'about' field`,
      'string.empty': `'about' cannot be an empty field`,
    }),
    favorite: Joi.boolean(),
  });

module.exports = { rabbitSchema, contactsUpdateFavoriteSchema, rabbitBreedSchema };
