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
 * /api/quotes:
 *   get:
 *     summary: Get Quotes
 *     description:
 *     tags: [Quotes]
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
router.get('/', quotesController.getQuotes);

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
 *   get:
 *     summary: Get Quote
 *     description:
 *     tags: [Quotes]
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
router.get('/:id', quotesController.getQuote);

/**
 * @swagger
 * /api/quotes/{id}:
 *   put:
 *     summary: Update Quote
 *     description:
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
router.put('/:id', quotesController.updateQuote);

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
router.delete('/:id', quotesController.deleteQuote);

export default router;
