const Joi = require('joi');

const FeedsSchema = Joi.object()
  .min(1)
  .keys({
    date: Joi.string().min(2).required().messages({
      'any.required': `missing required 'date' field`,
      'string.empty': `'date' cannot be an empty field`,
    }),
    name: Joi.string().min(2).required().messages({
      'any.required': `missing required 'name' field`,
      'string.empty': `'name' cannot be an empty field`,
    }),

    price: Joi.string().required().messages({
      'any.required': `missing required 'price' field`,
      'string.empty': `'price' cannot be an empty field`,
    }),

    quantity: Joi.string().messages({
      'string.empty': `'quantity' cannot be an empty field`,
      'any.required': `missing required 'quantity' field`,
    }),
    // favorite: Joi.boolean(),
  });

module.exports = { FeedsSchema };
