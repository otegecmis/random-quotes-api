import express from 'express';

import quotesController from '../controllers/quotes.controller';

const router = express.Router();

/**
 * @swagger
 * /api/quotes:
 *   post:
 *     summary: Create Quote
 *     tags: [Quotes]
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
router.post('/', quotesController.createQuotes);

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
router.get('/random', quotesController.randomQuotes);

/**
 * @swagger
 * /api/quotes/{id}:
 *   delete:
 *     summary: Delete Quote
 *     description:
 *     tags: [Quotes]
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
router.delete('/:id', quotesController.deleteQuotes);

export default router;
