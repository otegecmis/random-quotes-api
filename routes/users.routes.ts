import express from 'express';

import usersController from '../controllers/users.controller';

import rateLimiters from '../middleware/rate-limit.middleware';
import authCheck from '../middleware/auth-check.middleware';

const router = express.Router();

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: create user
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
router.post('/', rateLimiters.database, usersController.createUser);

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: login
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
 *       201:
 *         description: Created
 */
router.post('/login', rateLimiters.auth, usersController.login);

/**
 * @swagger
 * /api/users/refresh-tokens:
 *   put:
 *     summary: refresh tokens
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
router.put('/refresh-tokens', rateLimiters.auth, usersController.refreshTokens);

/**
 * @swagger
 * /api/users/send-reset-code:
 *   post:
 *     summary: send a password reset code to the user's email
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
  '/send-reset-code',
  rateLimiters.auth,
  usersController.sendResetCode,
);

/**
 * @swagger
 * /api/users/reset-password:
 *   put:
 *     summary: reset the user’s password
 *     tags: [users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               resetCode:
 *                 type: string
 *               newPassword:
 *                 type: string
 *             example:
 *               resetCode: ""
 *               newPassword: "111213"
 *     responses:
 *       200:
 *         description: OK
 */
router.put('/reset-password', rateLimiters.auth, usersController.resetPassword);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: get user
 *     description:
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
router.get('/:id', rateLimiters.common, usersController.getUser);

/**
 * @swagger
 * /api/users/{id}/password:
 *   put:
 *     summary: update password
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
  rateLimiters.database,
  authCheck.isSignIn,
  usersController.updatePassword,
);

/**
 * @swagger
 * /api/users/{id}/email:
 *   put:
 *     summary: update e-mail
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
  rateLimiters.database,
  authCheck.isSignIn,
  usersController.updateEmail,
);

/**
 * @swagger
 * /api/users/activate:
 *   put:
 *     summary: activate account
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
router.put('/activate', rateLimiters.database, usersController.activateAccount);

/**
 * @swagger
 * /api/users/{id}/deactivate:
 *   delete:
 *     summary: deactivate account
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
  rateLimiters.database,
  authCheck.isSignIn,
  usersController.deactivateAccount,
);

export default router;
