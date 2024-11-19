import { Request, Response } from 'express';

import rateLimit from 'express-rate-limit';

export const rateLimiter = (limit: number = 50) => {
  return rateLimit({
    windowMs: 15 * 60 * 1000,
    max: limit,
    message: `Too many requests from this IP, please try again after 15 minutes.`,
    handler: (req: Request, res: Response) => {
      res.status(429).json({
        message: `Too many requests from this IP, please try again after 15 minutes.`,
      });
    },
  });
};
