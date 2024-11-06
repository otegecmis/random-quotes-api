import express, { Request, Response, NextFunction } from 'express';
import createError, { HttpError } from 'http-errors';

import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';

import config from './config/index.config';
import routes from './routes/index.routes';

const app = express();

app
  .use(
    cors({
      origin: config.server.origin,
    }),
  )
  .use(helmet())
  .use(compression());

app
  .use('/api', routes)
  .use((req, res, next) => {
    next(createError.NotFound("The page you're looking for doesn't exist."));
  })
  .use((error: HttpError, req: Request, res: Response, next: NextFunction) => {
    const errorStatus = error.status || 500;
    const errorMessage = error.message || 'Internal Server Error';

    res.status(errorStatus).json({
      result: {
        message: errorMessage,
      },
    });
  });

export default app;
