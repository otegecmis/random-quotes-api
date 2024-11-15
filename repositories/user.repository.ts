import createError from 'http-errors';
import bcrypt from 'bcryptjs';

import User, { IUser } from '../models/User';

class UserRepository {
  async createUser(user: IUser): Promise<IUser> {
    try {
      return await User.create(user);
    } catch (error: any) {
      if (error.code === 11000 && error.keyPattern?.email) {
        throw createError(400, 'Please use a different email.');
      }

      throw createError(500);
    }
  }

  async getUserByEmail(email: string): Promise<IUser | null> {
    try {
      return await User.findOne({ email });
    } catch (error) {
      throw createError(500);
    }
  }

  async updatePassword(
    userID: string,
    oldPassword: string,
    newPassword: string,
  ): Promise<boolean> {
    try {
      const user = await User.findById(userID);

      if (!user) {
        throw createError(404, 'User not found.');
      }

      const isMatch = await bcrypt.compare(oldPassword, user.password);

      if (!isMatch) {
        throw createError(400, 'Incorrect current password.');
      }

      user.password = await bcrypt.hash(newPassword, 10);
      await user.save();

      return true;
    } catch (error) {
      throw createError(500, 'Error updating password.');
    }
  }

  async updateEmail(
    userID: string,
    oldEmail: string,
    newEmail: string,
  ): Promise<boolean> {
    try {
      const user = await User.findById(userID);

      if (!user) {
        throw createError(404, 'User not found.');
      }

      if (user.email !== oldEmail) {
        throw createError(400, 'Incorrect current email.');
      }

      user.email = newEmail;
      await user.save();

      return true;
    } catch (error) {
      throw createError(500, 'Error updating email.');
    }
  }

  async updateRole(userID: string, role: string): Promise<boolean> {
    try {
      const user = await User.findById(userID);

      if (!user) {
        throw createError(404, 'User not found.');
      }

      user.role = role;
      await user.save();

      return true;
    } catch (error) {
      throw createError(500, 'Error updating role.');
    }
  }

  async deactivateAccount(userID: string): Promise<boolean> {
    try {
      const user = await User.findById(userID);

      if (!user) {
        throw createError(404, 'User not found.');
      }

      user.status = false;
      await user.save();

      return true;
    } catch (error) {
      throw createError(500, 'Error updating status.');
    }
  }
}

export default new UserRepository();
