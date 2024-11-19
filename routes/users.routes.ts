import express from 'express';

import usersController from '../controllers/users.controller';

import { rateLimiter } from '../middleware/rate-limit.middleware';
import { checkValidation } from '../middleware/validation-check.middleware';
import { authCheck } from '../middleware/auth-check.middleware';

import {
  createUserValidationSchema,
  loginValidationSchema,
  refreshTokensValidationSchema,
  sendResetPasswordTokenValidationSchema,
  resetPasswordValidationSchema,
  getUserValidationSchema,
  updatePasswordValidationSchema,
  updateEmailValidationSchema,
  activateAccountValidationSchema,
  deactivateAccountValidationSchema,
} from '../validations/users.validation';

const router = express.Router();

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: create user
 *     description: create a new user
 *     tags: [users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               surname:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *               name: "Name"
 *               surname: "Surname"
 *               email: "namesurname@domain.com"
 *               password: "123456"
 *     responses:
 *       201:
 *         description: Created
 */
router.post(
  '/',
  rateLimiter(5),
  checkValidation(createUserValidationSchema),
  usersController.createUser,
);

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: login
 *     description: login with e-mail and password
 *     tags: [users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *               email: "namesurname@domain.com"
 *               password: "123456"
 *     responses:
 *       200:
 *         description: Ok
 */
router.post(
  '/login',
  rateLimiter(5),
  checkValidation(loginValidationSchema),
  usersController.login,
);

/**
 * @swagger
 * /api/users/refresh-tokens:
 *   put:
 *     summary: refresh tokens
 *     description: refresh access token and refresh token
 *     tags: [users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refreshToken:
 *                 type: string
 *             example:
 *               refreshToken: ""
 *     responses:
 *       200:
 *         description: OK
 */
router.put(
  '/refresh-tokens',
  rateLimiter(),
  checkValidation(refreshTokensValidationSchema),
  usersController.refreshTokens,
);

/**
 * @swagger
 * /api/users/send-reset-password-token:
 *   post:
 *     summary: send reset password token
 *     description: send a reset password token to the user's e-mail
 *     tags: [users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *             example:
 *               email: "namesurname@domain.com"
 *     responses:
 *       200:
 *         description: OK
 */
router.post(
  '/send-reset-password-token',
  rateLimiter(),
  checkValidation(sendResetPasswordTokenValidationSchema),
  usersController.sendResetPasswordToken,
);

/**
 * @swagger
 * /api/users/reset-password:
 *   put:
 *     summary: reset the user’s password
 *     description: update the user's password with the reset password token
 *     tags: [users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               resetPasswordToken:
 *                 type: string
 *               newPassword:
 *                 type: string
 *             example:
 *               resetPasswordToken: ""
 *               newPassword: "ABC123"
 *     responses:
 *       200:
 *         description: OK
 */
router.put(
  '/reset-password',
  rateLimiter(),
  checkValidation(resetPasswordValidationSchema),
  usersController.resetPassword,
);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: get user
 *     description: get user by id
 *     tags: [users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Ok
 */
router.get(
  '/:id',
  rateLimiter(),
  checkValidation(getUserValidationSchema),
  usersController.getUser,
);

/**
 * @swagger
 * /api/users/{id}/password:
 *   put:
 *     summary: update password
 *     description: update the user's password
 *     tags: [users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *               newPassword:
 *                 type: string
 *             example:
 *               password: "123456"
 *               newPassword: "987654"
 *     responses:
 *       200:
 *         description: Ok
 */
router.put(
  '/:id/password',
  rateLimiter(),
  checkValidation(updatePasswordValidationSchema),
  authCheck.isSignIn,
  usersController.updatePassword,
);

/**
 * @swagger
 * /api/users/{id}/email:
 *   put:
 *     summary: update e-mail
 *     description: update the user's e-mail
 *     tags: [users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               newEmail:
 *                 type: string
 *             example:
 *               email: "namesurname@domain.com"
 *               newEmail: "surnamename@domain.com"
 *     responses:
 *       200:
 *         description: Ok
 */
router.put(
  '/:id/email',
  rateLimiter(),
  checkValidation(updateEmailValidationSchema),
  authCheck.isSignIn,
  usersController.updateEmail,
);

/**
 * @swagger
 * /api/users/activate:
 *   put:
 *     summary: activate account
 *     description: activate the user's account
 *     tags: [users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *               email: "namesurname@domain.com"
 *               password: "123456"
 *     responses:
 *       200:
 *         description: Ok
 */
router.put(
  '/activate',
  rateLimiter(),
  checkValidation(activateAccountValidationSchema),
  usersController.activateAccount,
);

/**
 * @swagger
 * /api/users/{id}/deactivate:
 *   delete:
 *     summary: deactivate account
 *     description: deactivate the user's account
 *     tags: [users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Ok
 */
router.delete(
  '/:id/deactivate',
  rateLimiter(),
  checkValidation(deactivateAccountValidationSchema),
  authCheck.isSignIn,
  usersController.deactivateAccount,
);

export default router;
