import express from 'express';

import usersController from '../controllers/users.controller';

import { rateLimiter } from '../middleware/rate-limit.middleware';
import { checkValidation } from '../middleware/validation-check.middleware';
import { authCheck } from '../middleware/auth-check.middleware';

import {
  getUserValidationSchema,
  updatePasswordValidationSchema,
  updateEmailValidationSchema,
  deactivateAccountValidationSchema,
} from '../validations/users.validation';

const router = express.Router();

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: get user
 *     description: get user by id
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
router.get(
  '/:id',
  rateLimiter(),
  checkValidation(getUserValidationSchema),
  authCheck.isSignIn,
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
