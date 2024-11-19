import Joi from 'joi';

const sharedValidators = {
  id: Joi.string().hex().length(24).required(),
  quote: Joi.string().required(),
  author: Joi.string().required(),
  page: Joi.number().optional(),
};

export const createQuoteValidationSchema = Joi.object({
  quote: sharedValidators.quote,
  author: sharedValidators.author,
});

export const getQuotesValidationSchema = Joi.object({
  currentPage: sharedValidators.page,
  perPage: sharedValidators.page,
});

export const getQuoteValidationSchema = Joi.object({
  id: sharedValidators.id,
});

export const updateQuoteValidationSchema = Joi.object({
  id: sharedValidators.id,
  quote: sharedValidators.quote,
  author: sharedValidators.author,
});

export const deleteQuoteValidationSchema = Joi.object({
  id: sharedValidators.id,
});
