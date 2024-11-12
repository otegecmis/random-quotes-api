import express, { Router } from 'express';

import swaggerRoutes from './swagger.routes';
import authRoutes from './auth.routes';
import quotesRoutes from './quotes.routes';

const router: Router = express.Router();

router.use('/swagger', swaggerRoutes);
router.use('/auth', authRoutes);
router.use('/quotes', quotesRoutes);

export default router;
