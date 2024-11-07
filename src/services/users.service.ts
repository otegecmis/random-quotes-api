import bcrypt from 'bcrypt';
import createError from 'http-errors';

import { IUser } from '../models/User';
import userRepository from '../repositories/user.repository';

class UsersService {
  async createUser(email: string, password: string): Promise<IUser> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userRepository.createUser({
      email,
      password: hashedPassword,
    } as IUser);

    return user;
  }

  async getUserByEmail(email: string): Promise<IUser> {
    const user = await userRepository.getUserByEmail(email);

    if (!user) {
      throw createError.Unauthorized('Invalid email or password.');
    }

    return user;
  }
}

export default new UsersService();
