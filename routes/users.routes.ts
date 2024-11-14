import express from 'express';

import usersController from '../controllers/users.controller';

import rateLimiters from '../middleware/rate-limit.middleware';
import authCheck from '../middleware/auth-check.middleware';

const router = express.Router();

/**
 * @swagger
 * /api/users/{id}/password:
 *   put:
 *     summary:
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
 *               newPassword:
 *                 type: string
 *             example:
 *               oldPassword: "123456"
 *               newPassword: "qweasd"
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
 *     summary:
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
 *               newEmail:
 *                 type: string
 *             example:
 *               oldEmail: "namesurname@domain.com"
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
 * /api/users/{id}/role:
 *   put:
 *     summary:
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
 *               role:
 *                 type: string
 *             example:
 *               role: "admin"
 *     responses:
 *       200:
 *         description: Ok
 */
router.put(
  '/:id/role',
  rateLimiters.database,
  authCheck.isSignIn,
  usersController.updateRole,
);

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Deactivate Account
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
  usersController.deactivateProfile,
);

export default router;
