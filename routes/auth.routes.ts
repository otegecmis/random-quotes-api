import express from 'express';

import authContoller from '../controllers/auth.contoller';

import { rateLimiter } from '../middleware/rate-limit.middleware';
import { checkValidation } from '../middleware/validation-check.middleware';

import {
  signUpValidationSchema,
  signInValidationSchema,
  refreshTokensValidationSchema,
  sendResetPasswordTokenValidationSchema,
  resetPasswordValidationSchema,
  activateAccountValidationSchema,
} from '../validations/auth.validation';

const router = express.Router();

/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     summary: sign up
 *     description: create a new user
 *     tags: [auth]
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
  '/signup',
  rateLimiter(5),
  checkValidation(signUpValidationSchema),
  authContoller.signUp,
);

/**
 * @swagger
 * /api/auth/signin:
 *   post:
 *     summary: sign in
 *     description: sign in with e-mail and password
 *     tags: [auth]
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
  '/signin',
  rateLimiter(5),
  checkValidation(signInValidationSchema),
  authContoller.signIn,
);

/**
 * @swagger
 * /api/auth/refresh-tokens:
 *   put:
 *     summary: refresh tokens
 *     description: refresh access token and refresh token
 *     tags: [auth]
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
  authContoller.refreshTokens,
);

/**
 * @swagger
 * /api/auth/send-reset-password-token:
 *   post:
 *     summary: send reset password token
 *     description: send a reset password token to the user's e-mail
 *     tags: [auth]
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
  authContoller.sendResetPasswordToken,
);

/**
 * @swagger
 * /api/auth/reset-password:
 *   put:
 *     summary: reset the user’s password
 *     description: update the user's password with the reset password token
 *     tags: [auth]
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
  authContoller.resetPassword,
);

/**
 * @swagger
 * /api/auth/activate:
 *   put:
 *     summary: activate account
 *     description: activate the user's account
 *     tags: [auth]
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
  authContoller.activateAccount,
);

export default router;
