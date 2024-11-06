import bcrypt from 'bcrypt';
import createError from 'http-errors';

import { IUser } from '../models/User';
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

  async signIn(email: string, password: string): Promise<any> {
    const user = await userRepository.getUserByEmail(email);

    if (!user) {
      throw createError.Unauthorized('Invalid email or password.');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw createError.Unauthorized('Invalid email or password.');
    }

    const result = {
      userID: user.id,
    };

    return result;
  }
}

export default new AuthService();
