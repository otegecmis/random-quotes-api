import { Request, Response, NextFunction } from 'express';

import { IUser } from '../models/User';

import usersService from '../services/users.service';
import authService from '../services/auth.service';

class AuthController {
  async signUp(req: Request, res: Response, next: NextFunction): Promise<void> {
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

  async signIn(req: Request, res: Response, next: NextFunction): Promise<void> {
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
}

export default new AuthController();
