import Joi from 'joi';

export const updatePasswordValidationSchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
  oldPassword: Joi.string().email().required(),
  newPassword: Joi.string().min(6).required(),
});

export const updateEmailValidationSchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
  oldEmail: Joi.string().email().required(),
  newEmail: Joi.string().email().required(),
});

export const updateRoleValidationSchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
  role: Joi.string().required(),
});
