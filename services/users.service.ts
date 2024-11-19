import bcrypt from 'bcryptjs';
import createError from 'http-errors';

import { IUser } from '../models/User';

import userRepository from '../repositories/user.repository';
import tokenService from './token.service';
import quotesService from './quotes.service';

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

  async getUser(id: string): Promise<Object> {
    const findUser = await this.getUserByID(id);
    const getQuotesByAuthor = await quotesService.getQuotesByAuthor(
      findUser.id,
    );

    const quotes = getQuotesByAuthor.quotes.map((quote) => ({
      id: quote.id,
      quote: quote.quote,
      author: quote.author,
    }));

    return {
      id: findUser.id,
      name: findUser.name,
      surname: findUser.surname,
      quotes,
    };
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

  async resetPassword(
    resetPasswordToken: string,
    newPassword: string,
  ): Promise<Object> {
    const userID =
      await tokenService.verifyResetPasswordToken(resetPasswordToken);
    const updatedUser = await userRepository.updatePassword(
      userID,
      newPassword,
    );

    if (!updatedUser) {
      throw createError(400, 'Failed to reset password.');
    }

    return {
      message: 'Password reset successfully.',
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

    const isEmailTaken = await userRepository.getUserByEmail(newEmail);

    if (isEmailTaken) {
      throw createError(400, 'Please use a different email.');
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

  async activateAccount(
    email: string,
    password: string,
  ): Promise<{ message: string; email: string }> {
    const user: IUser = await this.getUserByEmail(email);
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw createError.Unauthorized('Invalid email or password.');
    }

    if (user.status === true) {
      throw createError.Forbidden('Your account is already active.');
    }

    await userRepository.activateAccount(user.id);

    return {
      message: 'Account successfully activated.',
      email: user.email,
    };
  }

  async deactivateAccount(userID: string): Promise<Object> {
    const getUser = await this.getUserByID(userID);
    const updatedUser = await userRepository.deactivateAccount(getUser.id);

    if (!updatedUser) {
      throw createError(400, 'Failed to deactivate account.');
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
