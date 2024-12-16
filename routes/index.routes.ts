import express, { Router } from 'express';

import authRoutes from './auth.routes';
import usersRoutes from './users.routes';
import quotesRoutes from './quotes.routes';
import swaggerRoutes from './swagger.routes';

const router: Router = express.Router();

router.use('/auth', authRoutes);
router.use('/users', usersRoutes);
router.use('/quotes', quotesRoutes);
router.use('/swagger', swaggerRoutes);

export default router;
