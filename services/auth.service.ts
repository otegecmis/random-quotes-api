import bcrypt from 'bcryptjs';
import createError from 'http-errors';

import { IUser } from '../models/User';

import tokenService from './token.service';
import usersService from './users.service';

class AuthService {
  async login(email: string, password: string): Promise<Object> {
    const user: IUser = await usersService.getUserByEmail(email);
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw createError.Unauthorized('Invalid email or password.');
    }

    const access_token: string = await tokenService.createAccessToken(user.id);
    const refresh_token: string = await tokenService.createRefreshToken(
      user.id,
    );

    if (user.status === false) {
      throw createError.Forbidden(
        'Your profile is currently deactivated. Please reactivate your account to continue.',
      );
    }

    return {
      userID: user.id,
      access_token,
      refresh_token,
    };
  }

  async refreshTokens(token: string): Promise<Object> {
    const userID: string = await tokenService.verifyRefreshToken(token);
    const access_token: string = await tokenService.createAccessToken(userID);
    const refresh_token: string = await tokenService.createRefreshToken(userID);

    return {
      userID,
      access_token,
      refresh_token,
    };
  }

  // TODO: Implement the sendResetPasswordToken method to send a reset password token to the user's email.
  async sendResetPasswordToken(email: string): Promise<Object> {
    const user: IUser = await usersService.getUserByEmail(email);
    const resetPasswordToken = await tokenService.createResetPasswordToken(
      user.id,
    );

    return {
      message: 'Password reset service is not available at the moment.',
    };
  }
}

export default new AuthService();
