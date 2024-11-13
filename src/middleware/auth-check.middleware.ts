import { Request, Response, NextFunction } from 'express';
import createError from 'http-errors';

import tokenService from '../services/token.service';

export interface AuthRequest extends Request {
  payload?: any;
}

const authCheck = {
  isSignIn: async (
    req: AuthRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const authHeader = req.headers['authorization'];

      if (!authHeader) throw createError.Unauthorized('Please log in.');

      const bearerToken = authHeader.split(' ');
      req.payload = await tokenService.verifyAccessToken(bearerToken[1]);

      next();
    } catch (error) {
      next(error);
    }
  },
};

export default authCheck;
