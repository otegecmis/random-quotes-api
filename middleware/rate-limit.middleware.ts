import { Request, Response } from 'express';

import rateLimit from 'express-rate-limit';

const rateLimiters = {
  common: rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 150,
    message:
      'Too many requests from this IP, please try again after 15 minutes.',
    handler: (req: Request, res: Response) => {
      res.status(429).json({
        message:
          'Too many requests from this IP, please try again after 15 minutes.',
      });
    },
  }),
  auth: rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message:
      'Too many authentication requests from this IP, please try again after 15 minutes.',
    handler: (req: Request, res: Response) => {
      res.status(429).json({
        message:
          'Too many authentication requests from this IP, please try again after 15 minutes.',
      });
    },
  }),
  database: rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 30,
    message:
      'Too many database operations from this IP, please try again after 15 minutes.',
    handler: (req: Request, res: Response) => {
      res.status(429).json({
        message:
          'Too many database operations from this IP, please try again after 15 minutes.',
      });
    },
  }),
};

export default rateLimiters;
