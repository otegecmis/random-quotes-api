import Joi from 'joi';

export const createUserValidationSchema = Joi.object({
  name: Joi.string().required(),
  surname: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

export const loginValidationSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

export const refreshTokensValidationSchema = Joi.object({
  refreshToken: Joi.string().regex(
    /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_.+/=]*$/,
  ),
});

export const sendResetCodeValidationSchema = Joi.object({
  email: Joi.string().email().required(),
});

export const resetPasswordCodeValidationSchema = Joi.object({
  resetCode: Joi.string().required(),
  newPassword: Joi.string().min(6).required(),
});

export const getUserValidationSchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
});

export const updatePasswordValidationSchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
  password: Joi.string().email().required(),
  newPassword: Joi.string().min(6).required(),
});

export const updateEmailValidationSchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
  email: Joi.string().email().required(),
  newEmail: Joi.string().email().required(),
});

export const activateAccountValidationSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

export const deactivateAccountValidationSchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
});
