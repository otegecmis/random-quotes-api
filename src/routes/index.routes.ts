import express, { Router } from 'express';

const router: Router = express.Router();

import indexController from '../controllers/index.controller';

router.get('/', indexController.welcomePage);

export default router;
