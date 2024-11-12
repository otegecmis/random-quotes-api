import Joi from 'joi';

export const createQuoteValidationSchema = Joi.object({
  quote: Joi.string().required(),
  author: Joi.string().required(),
});

export const deleteQuoteValidationSchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
});
