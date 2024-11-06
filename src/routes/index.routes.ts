import express, { Router } from 'express';

import authRoutes from './auth.routes';
import swaggerRoutes from './swagger.routes';

const router: Router = express.Router();

router.use('/swagger', swaggerRoutes);
router.use('/auth', authRoutes);

export default router;
