import Joi from 'joi';

const sharedValidators = {
  id: Joi.string().hex().length(24).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
};

export const getUserValidationSchema = Joi.object({
  id: sharedValidators.id,
});

export const updatePasswordValidationSchema = Joi.object({
  id: sharedValidators.id,
  password: sharedValidators.password,
  newPassword: sharedValidators.password,
});

export const updateEmailValidationSchema = Joi.object({
  id: sharedValidators.id,
  email: sharedValidators.email,
  newEmail: sharedValidators.email,
});

export const deactivateAccountValidationSchema = Joi.object({
  id: sharedValidators.id,
});
