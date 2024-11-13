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

  async updatePassword(
    userID: string,
    oldPassword: string,
    newPassword: string,
  ) {
    const isUpdated = await userRepository.updatePassword(
      userID,
      oldPassword,
      newPassword,
    );

    if (isUpdated) {
      return { message: 'Password updated successfully.' };
    }

    throw new Error('Failed to update password.');
  }

  async updateEmail(userID: string, oldEmail: string, newEmail: string) {
    const isUpdated = await userRepository.updateEmail(
      userID,
      oldEmail,
      newEmail,
    );

    if (isUpdated) {
      return { message: 'Email updated successfully.' };
    }

    throw new Error('Failed to update email.');
  }
}

export default new UsersService();
