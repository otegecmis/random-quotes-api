import express, { Router } from 'express';

import usersRoutes from './users.routes';
import quotesRoutes from './quotes.routes';
import swaggerRoutes from './swagger.routes';

const router: Router = express.Router();

router.use('/users', usersRoutes);
router.use('/quotes', quotesRoutes);
router.use('/swagger', swaggerRoutes);

export default router;
