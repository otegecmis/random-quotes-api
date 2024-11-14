import express from 'express';

import authController from '../controllers/auth.controller';

import rateLimiters from '../middleware/rate-limit.middleware';

const router = express.Router();

/**
 * @swagger
 * /api/auth/signin:
 *   post:
 *     summary: sign in
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
 *         description: OK
 */
router.post('/signin', rateLimiters.auth, authController.signIn);

/**
 * @swagger
 * /api/auth/refresh:
 *   put:
 *     summary: refresh tokens
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
router.put('/refresh', rateLimiters.auth, authController.refresh);

export default router;
