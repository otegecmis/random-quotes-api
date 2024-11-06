/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     summary: Sign up
 *     tags: [Auth]
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
 * /api/auth/signin:
 *   post:
 *     summary: Sign in
 *     tags: [Auth]
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
 *         description: OK
 * /api/auth/refresh:
 *   put:
 *     summary: Refresh tokens
 *     description: Refresh the access token using the refresh token.
 *     tags: [Auth]
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
import express from 'express';

import authController from '../controllers/auth.controller';

const router = express.Router();

router
  .post('/signup', authController.signUp)
  .post('/signin', authController.signIn)
  .put('/refresh', authController.refresh);

export default router;
