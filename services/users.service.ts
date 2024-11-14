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

    if (!isUpdated) {
      throw createError(400, 'Failed to update password.');
    }

    return { message: 'Password updated successfully.' };
  }

  async updateEmail(userID: string, oldEmail: string, newEmail: string) {
    const isUpdated = await userRepository.updateEmail(
      userID,
      oldEmail,
      newEmail,
    );

    if (!isUpdated) {
      throw createError(400, 'Failed to update email.');
    }

    return { message: 'Email updated successfully.' };
  }

  async updateRole(userID: string, role: string) {
    const isUpdated = await userRepository.updateRole(userID, role);

    if (!isUpdated) {
      throw createError(400, 'Failed to update role.');
    }

    return { message: 'Role updated successfully.' };
  }

  async deactivateProfile(userID: string) {
    const isDeactivated = await userRepository.deactivateProfile(userID);

    if (!isDeactivated) {
      throw createError(400, 'Failed to deactivate role.');
    }

    return { message: 'Profile deactivated successfully.' };
  }
}

export default new UsersService();
