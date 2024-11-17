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

    const result = {
      userID: user.id,
      access_token,
      refresh_token,
    };

    return result;
  }

  async refreshTokens(token: string): Promise<Object> {
    const userID: string = await tokenService.verifyRefreshToken(token);
    const access_token: string = await tokenService.createAccessToken(userID);
    const refresh_token: string = await tokenService.createRefreshToken(userID);

    const result = {
      userID,
      access_token,
      refresh_token,
    };

    return result;
  }

  async sendResetCode(email: string): Promise<Object> {
    return {
      message: 'WIP',
      email,
    };
  }
}

export default new AuthService();
