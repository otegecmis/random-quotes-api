import Joi from 'joi';

const sharedValidators = {
  id: Joi.string().hex().length(24).required(),
  namesurname: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  token: Joi.string()
    .regex(/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_.+/=]*$/)
    .required(),
};

export const createUserValidationSchema = Joi.object({
  name: sharedValidators.namesurname,
  surname: sharedValidators.namesurname,
  email: sharedValidators.email,
  password: sharedValidators.password,
});

export const loginValidationSchema = Joi.object({
  email: sharedValidators.email,
  password: sharedValidators.password,
});

export const refreshTokensValidationSchema = Joi.object({
  refreshToken: sharedValidators.token,
});

export const sendResetPasswordTokenValidationSchema = Joi.object({
  email: sharedValidators.email,
});

export const resetPasswordValidationSchema = Joi.object({
  resetPasswordToken: sharedValidators.token,
  newPassword: sharedValidators.password,
});

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

export const activateAccountValidationSchema = Joi.object({
  email: sharedValidators.email,
  password: sharedValidators.password,
});

export const deactivateAccountValidationSchema = Joi.object({
  id: sharedValidators.id,
});
