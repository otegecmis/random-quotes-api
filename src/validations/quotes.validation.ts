import Joi from 'joi';

export const createQuoteValidationSchema = Joi.object({
  quote: Joi.string().required(),
  author: Joi.string().required(),
});

export const getQuotesValidationSchema = Joi.object({
  currentPage: Joi.number().optional(),
  perPage: Joi.number().optional(),
});

export const getQuoteValidationSchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
});

export const updateQuoteValidationSchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
  quote: Joi.string().required(),
  author: Joi.string().required(),
});

export const deleteQuoteValidationSchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
});
