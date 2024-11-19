import { Request, Response, NextFunction } from 'express';
import createError from 'http-errors';

import { IUser } from '../models/User';
import usersService from '../services/users.service';
import authService from '../services/auth.service';

import { AuthRequest } from '../middleware/auth-check.middleware';

class UsersController {
  async createUser(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
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
      const { refreshToken } = req.body;
      const result = await authService.refreshTokens(refreshToken);

      res.status(200).json({
        result: result,
      });
    } catch (error) {
      next(error);
    }
  }

  async sendResetPasswordToken(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { email } = req.body;
      const result = await authService.sendResetPasswordToken(email);

      // TODO: After implementing the e-mail service, the response should be 200.
      res.status(503).json({
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
      const { resetPasswordToken, newPassword } = req.body;
      const result = await usersService.resetPassword(
        resetPasswordToken,
        newPassword,
      );

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
      const { password, newPassword } = req.body;
      const { id } = req.params;
      const authID = req.payload.aud;

      if (id !== authID) {
        return next(
          createError.Unauthorized("You can't update other user's password."),
        );
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
      const { email, newEmail } = req.body;
      const { id } = req.params;
      const authID = req.payload.aud;

      if (id !== authID) {
        return next(
          createError.Unauthorized("You can't update other user's email."),
        );
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
      const { id } = req.params;
      const authID = req.payload.aud;

      if (id !== authID) {
        return next(
          createError.Unauthorized(
            "You can't deactivate other user's account.",
          ),
        );
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
