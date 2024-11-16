import bcrypt from 'bcryptjs';
import createError from 'http-errors';

import { IUser } from '../models/User';
import userRepository from '../repositories/user.repository';

class UsersService {
  async createUser(user: IUser): Promise<Object> {
    user.password = await bcrypt.hash(user.password, 10);
    const createdUser = await userRepository.createUser(user);

    return {
      id: createdUser.id,
      name: createdUser.name,
      surname: createdUser.surname,
      email: createdUser.email,
    };
  }

  async getUserByID(userID: string): Promise<IUser> {
    const getUser = await userRepository.getUserByID(userID);

    if (!getUser) {
      throw createError.NotFound('User not found.');
    }

    return getUser;
  }

  async getUserByEmail(email: string): Promise<IUser> {
    const getUser = await userRepository.getUserByEmail(email);

    if (!getUser) {
      throw createError.Unauthorized('Invalid email or password.');
    }

    return getUser;
  }

  async updatePassword(
    userID: string,
    password: string,
    newPassword: string,
  ): Promise<Object> {
    const getUser = await this.getUserByID(userID);
    const isMatch = await bcrypt.compare(password, getUser.password);

    if (!isMatch) {
      throw createError(400, 'Incorrect current password.');
    }

    const updatedUser = await userRepository.updatePassword(
      getUser.id,
      newPassword,
    );

    if (!updatedUser) {
      throw createError(400, 'Failed to update password.');
    }

    return {
      userID: updatedUser.id,
      name: updatedUser.name,
      surname: updatedUser.surname,
      message: 'Password updated successfully.',
    };
  }

  async updateEmail(
    userID: string,
    email: string,
    newEmail: string,
  ): Promise<Object> {
    const getUser = await this.getUserByID(userID);

    if (getUser.email !== email) {
      throw createError(400, 'Incorrect current email.');
    }

    const updatedUser = await userRepository.updateEmail(getUser.id, newEmail);

    if (!updatedUser) {
      throw createError(400, 'Failed to update email.');
    }

    return {
      userID: updatedUser.id,
      name: updatedUser.name,
      surname: updatedUser.surname,
      email: updatedUser.email,
      message: 'Email updated successfully.',
    };
  }

  async deactivateAccount(userID: string): Promise<Object> {
    const getUser = await this.getUserByID(userID);
    const updatedUser = await userRepository.deactivateAccount(getUser.id);

    if (!updatedUser) {
      throw createError(400, 'Failed to deactivate role.');
    }

    return {
      userID: updatedUser.id,
      name: updatedUser.name,
      surname: updatedUser.surname,
      email: updatedUser.email,
      message: 'Account deactivated successfully.',
    };
  }
}

export default new UsersService();
