import express, { Router } from 'express';

import config from '../config/index.config';
import { serve, setup } from '../config/swagger.config';

import authRoutes from './auth.routes';

const router: Router = express.Router();

if (config.server.node_env === 'development') {
  router.use('/', serve, setup);
}

router.use('/auth', authRoutes);

export default router;
