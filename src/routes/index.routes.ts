import express, { Router } from 'express';

import swaggerRoutes from './swagger.routes';
import authRoutes from './auth.routes';

const router: Router = express.Router();

router.use('/swagger', swaggerRoutes);
router.use('/auth', authRoutes);

export default router;