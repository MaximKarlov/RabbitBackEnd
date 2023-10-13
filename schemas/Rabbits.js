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

    photoRabbit: Joi.string().min(6).required().messages({
      'any.required': `missing required 'photoRabbit' field`,
      'string.empty': `'photoRabbit' cannot be an empty field`,
    }),
    // favorite: Joi.boolean(),
  });

const contactsUpdateFavoriteSchema = Joi.object()
  .min(1)
  .keys({
    favorite: Joi.boolean().required().messages({
      'any.required': `missing required 'favorite' field`,
      'string.empty': `'favorite' cannot be an empty field`,
    }),
  });

module.exports = { rabbitSchema, contactsUpdateFavoriteSchema };
