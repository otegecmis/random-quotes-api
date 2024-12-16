import Joi from 'joi';

const sharedValidators = {
  namesurname: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  token: Joi.string()
    .regex(/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_.+/=]*$/)
    .required(),
};

export const signUpValidationSchema = Joi.object({
  name: sharedValidators.namesurname,
  surname: sharedValidators.namesurname,
  email: sharedValidators.email,
  password: sharedValidators.password,
});

export const signInValidationSchema = Joi.object({
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

export const activateAccountValidationSchema = Joi.object({
  email: sharedValidators.email,
  password: sharedValidators.password,
});
