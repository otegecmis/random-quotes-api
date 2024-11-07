import express, { Express, Request, Response, NextFunction } from 'express';
import createError, { HttpError } from 'http-errors';

import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';

import config from './config/index.config';
import routes from './routes/index.routes';

const app: Express = express();

app
  .use(
    cors({
      origin: config.server.origin,
    }),
  )
  .use(helmet())
  .use(compression())
  .use(express.json());

app
  .use('/api', routes)
  .use((req: Request, res: Response, next: NextFunction) => {
    next(createError.NotFound("The page you're looking for doesn't exist."));
  })
  .use((error: HttpError, req: Request, res: Response, next: NextFunction) => {
    const errorStatus: number = error.status || 500;
    const errorMessage: string = error.message || 'Internal Server Error';

    res.status(errorStatus).json({
      result: {
        message: errorMessage,
      },
    });
  });

export default app;
