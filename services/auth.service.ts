import bcrypt from 'bcryptjs';
import createError from 'http-errors';

import { IUser } from '../models/User';

import tokenService from './token.service';
import usersService from './users.service';

import emailHelper from '../helpers/email.helper';

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

  async sendResetPasswordToken(email: string): Promise<Object> {
    const user: IUser = await usersService.getUserByEmail(email);
    const resetPasswordToken = await tokenService.createResetPasswordToken(
      user.id,
    );

    const to = user.email;
    const subject = 'Reset Password';
    const text = `Your reset password token is: ${resetPasswordToken}`;
    const sendEmail = await emailHelper.sendEMail(to, subject, text);

    return {
      message: sendEmail.message,
    };
  }
}

export default new AuthService();
