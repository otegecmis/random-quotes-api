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
 *               oldPassword:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *               oldPassword: "123456"
 *               password: "987654"
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
 *               oldEmail:
 *                 type: string
 *               email:
 *                 type: string
 *             example:
 *               oldEmail: "namesurname@domain.com"
 *               email: "surnamename@domain.com"
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
 * /api/users/{id}:
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
  '/:id',
  rateLimiters.database,
  authCheck.isSignIn,
  usersController.deactivateAccount,
);

export default router;
