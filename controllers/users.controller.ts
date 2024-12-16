import { Request, Response, NextFunction } from 'express';
import createError from 'http-errors';

import usersService from '../services/users.service';

import { AuthRequest } from '../middleware/auth-check.middleware';

class UsersController {
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
