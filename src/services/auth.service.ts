import bcrypt from 'bcrypt';
import createError from 'http-errors';

import { IUser } from '../models/User';
import tokenService from './token.service';
import userRepository from '../repositories/user.repository';

class AuthService {
  async signUp(email: string, password: string): Promise<object> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userRepository.createUser({
      email,
      password: hashedPassword,
    } as IUser);

    const result = {
      userID: user.id,
      email: user.email,
    };

    return result;
  }

  async signIn(email: string, password: string): Promise<object> {
    const user = await userRepository.getUserByEmail(email);

    if (!user) {
      throw createError.Unauthorized('Invalid email or password.');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw createError.Unauthorized('Invalid email or password.');
    }

    const access_token: string = await tokenService.createAccessToken(user.id);
    const refresh_token: string = await tokenService.createRefreshToken(
      user.id,
    );

    const result = {
      userID: user.id,
      access_token,
      refresh_token,
    };

    return result;
  }

  async refresh(token: string): Promise<object> {
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
}

export default new AuthService();
