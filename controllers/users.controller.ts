import { NextFunction, Request, Response } from 'express';
import createError from 'http-errors';

import { IUser } from '../models/User';
import usersService from '../services/users.service';
import authService from '../services/auth.service';

import { AuthRequest } from '../middleware/auth-check.middleware';
import {
  createUserValidationSchema,
  loginValidationSchema,
  refreshTokensValidationSchema,
  sendResetCodeValidationSchema,
  resetPasswordCodeValidationSchema,
  getUserValidationSchema,
  updatePasswordValidationSchema,
  updateEmailValidationSchema,
  activateAccountValidationSchema,
  deactivateAccountValidationSchema,
} from '../validations/users.validation';

class UsersController {
  async createUser(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { error } = createUserValidationSchema.validate(req.body);

      if (error) {
        res.status(400).json({
          result: {
            message: error.details[0].message,
          },
        });

        return;
      }

      const { name, surname, email, password } = req.body;
      const result = await usersService.createUser({
        name,
        surname,
        email,
        password,
      } as IUser);

      res.status(201).json({
        result,
      });
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { error } = loginValidationSchema.validate(req.body);

      if (error) {
        res.status(400).json({
          result: {
            message: error.details[0].message,
          },
        });

        return;
      }

      const { email, password } = req.body;
      const result = await authService.login(email, password);

      res.status(200).json({
        result: result,
      });
    } catch (error) {
      next(error);
    }
  }

  async refreshTokens(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { error } = refreshTokensValidationSchema.validate(req.body);

      if (error) {
        res.status(400).json({
          result: {
            message: error.details[0].message,
          },
        });

        return;
      }

      const { refreshToken } = req.body;
      const result = await authService.refreshTokens(refreshToken);

      res.status(200).json({
        result: result,
      });
    } catch (error) {
      next(error);
    }
  }

  async sendResetCode(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { error } = sendResetCodeValidationSchema.validate(req.body);

      if (error) {
        res.status(400).json({
          result: {
            message: error.details[0].message,
          },
        });

        return;
      }

      const { email } = req.body;
      const result = await authService.sendResetCode(email);

      res.status(200).json({
        result: result,
      });
    } catch (error) {
      next(error);
    }
  }

  async resetPassword(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { error } = resetPasswordCodeValidationSchema.validate(req.body);

      if (error) {
        res.status(400).json({
          result: {
            message: error.details[0].message,
          },
        });

        return;
      }

      const { resetCode, newPassword } = req.body;
      const result = await usersService.resetPassword(resetCode, newPassword);

      res.status(200).json({
        result: result,
      });
    } catch (error) {
      next(error);
    }
  }

  async getUser(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { error } = getUserValidationSchema.validate(req.params);

      if (error) {
        res.status(400).json({
          result: {
            message: error.details[0].message,
          },
        });

        return;
      }

      const { id } = req.params;
      const result = await usersService.getUser(id);

      res.status(200).json({
        result,
      });
    } catch (error) {
      next(error);
    }
  }

  async updatePassword(
    req: AuthRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { error } = updatePasswordValidationSchema.validate({
        ...req.params,
        ...req.body,
      });

      if (error) {
        res.status(400).json({
          result: {
            message: error.details[0].message,
          },
        });

        return;
      }

      const { password, newPassword } = req.body;
      const { id } = req.params;
      const authID = req.payload.aud;

      if (id !== authID) {
        return next(createError.Unauthorized());
      }

      const result = await usersService.updatePassword(
        id,
        password,
        newPassword,
      );

      res.status(200).json({
        result,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateEmail(
    req: AuthRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { error } = updateEmailValidationSchema.validate({
        ...req.params,
        ...req.body,
      });

      if (error) {
        res.status(400).json({
          result: {
            message: error.details[0].message,
          },
        });

        return;
      }

      const { email, newEmail } = req.body;
      const { id } = req.params;
      const authID = req.payload.aud;

      if (id !== authID) {
        return next(createError.Unauthorized());
      }

      const result = await usersService.updateEmail(id, email, newEmail);

      res.status(200).json({
        result,
      });
    } catch (error) {
      next(error);
    }
  }

  async activateAccount(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { error } = activateAccountValidationSchema.validate(req.body);

      if (error) {
        res.status(400).json({
          result: {
            message: error.details[0].message,
          },
        });

        return;
      }

      const { email, password } = req.body;
      const result = await usersService.activateAccount(email, password);

      res.status(200).json({
        result: result,
      });
    } catch (error) {
      next(error);
    }
  }

  async deactivateAccount(
    req: AuthRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { error } = deactivateAccountValidationSchema.validate(req.params);

      if (error) {
        res.status(400).json({
          result: {
            message: error.details[0].message,
          },
        });

        return;
      }

      const { id } = req.params;
      const authID = req.payload.aud;

      if (id !== authID) {
        return next(createError.Unauthorized());
      }

      const result = await usersService.deactivateAccount(id);

      res.status(200).json({
        result,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new UsersController();
