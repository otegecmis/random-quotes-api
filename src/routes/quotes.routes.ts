import express from 'express';

import quotesController from '../controllers/quotes.controller';

import authCheck from '../middleware/auth-check.middleware';
import rateLimiters from '../middleware/rate-limit.middleware';

const router = express.Router();

/**
 * @swagger
 * /api/quotes:
 *   post:
 *     summary: Create Quote
 *     tags: [Quotes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               quote:
 *                 type: string
 *               author:
 *                 type: string
 *             example:
 *               quote: "Yaşamayı öğrendiğimi sandığımda aslında ölmeyi öğreniyormuşum."
 *               author: "Leonardo Da Vinci"
 *     responses:
 *       201:
 *         description: Created
 */
router.post(
  '/',
  rateLimiters.database,
  authCheck.isSignIn,
  quotesController.createQuotes,
);

/**
 * @swagger
 * /api/quotes:
 *   get:
 *     summary: Get Quotes
 *     description:
 *     tags: [Quotes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: currentPage
 *         schema:
 *           type: int
 *       - in: query
 *         name: perPage
 *         schema:
 *           type: int
 *     responses:
 *       200:
 *         description: Ok
 */
router.get(
  '/',
  rateLimiters.common,
  authCheck.isSignIn,
  quotesController.getQuotes,
);

/**
 * @swagger
 * /api/quotes/random:
 *   get:
 *     summary: Random Quote
 *     description:
 *     tags: [Quotes]
 *     responses:
 *       200:
 *         description: OK
 */
router.get('/random', rateLimiters.common, quotesController.randomQuotes);

/**
 * @swagger
 * /api/quotes/{id}:
 *   get:
 *     summary: Get Quote
 *     description:
 *     tags: [Quotes]
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
  rateLimiters.common,
  authCheck.isSignIn,
  quotesController.getQuote,
);

/**
 * @swagger
 * /api/quotes/{id}:
 *   put:
 *     summary: Update Quote
 *     description:
 *     tags: [Quotes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               quote:
 *                 type: string
 *               author:
 *                 type: string
 *             example:
 *               quote: "Tıpkı kullanılmayan demirin paslanması ve suyun soğukta donması ya da kokuşması gibi kullanılmayan zihin de bozulur."
 *               author: "Leonardo di ser Piero da Vinci"
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
router.put(
  '/:id',
  rateLimiters.database,
  authCheck.isSignIn,
  quotesController.updateQuote,
);

/**
 * @swagger
 * /api/quotes/{id}:
 *   delete:
 *     summary: Delete Quote
 *     description:
 *     tags: [Quotes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: No Content
 */
router.delete(
  '/:id',
  rateLimiters.database,
  authCheck.isSignIn,
  quotesController.deleteQuote,
);

export default router;
