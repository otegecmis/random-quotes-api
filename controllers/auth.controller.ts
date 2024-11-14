import { NextFunction, Request, Response } from 'express';

import authService from '../services/auth.service';
import {
  refreshTokenValidationSchema,
  signInValidationSchema,
  signUpValidationSchema,
} from '../validations/auth.validation';

class AuthController {
  async signIn(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { error } = signInValidationSchema.validate(req.body);

      if (error) {
        res.status(400).json({
          result: {
            message: error.details[0].message,
          },
        });

        return;
      }

      const { email, password } = req.body;
      const result = await authService.signIn(email, password);

      res.status(200).json({
        result: result,
      });
    } catch (error) {
      next(error);
    }
  }

  async refresh(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { error } = refreshTokenValidationSchema.validate(req.body);

      if (error) {
        res.status(400).json({
          result: {
            message: error.details[0].message,
          },
        });

        return;
      }

      const { refreshToken } = req.body;
      const result = await authService.refresh(refreshToken);

      res.status(200).json({
        result: result,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new AuthController();
