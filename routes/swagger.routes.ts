import express from 'express';

import config from '../config/index.config';
import logger from '../helpers/logger.helper';
import { serve, setup } from '../config/swagger.config';

const router = express.Router();

if (config.server.node_env === 'development') {
  router.use('/', serve, setup);

  logger.info('Swagger is available at /api/swagger');
}

export default router;
