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

      throw createError(500, `${error.message}`);
    }
  }

  async getUserByID(id: string): Promise<IUser | null> {
    try {
      return await User.findById(id).exec();
    } catch (error: any) {
      throw createError(500, `${error.message}`);
    }
  }

  async getUserByEmail(email: string): Promise<IUser | null> {
    try {
      return await User.findOne({ email });
    } catch (error: any) {
      throw createError(500, `${error.message}`);
    }
  }

  async updatePassword(userID: string, password: string): Promise<IUser> {
    try {
      const getUser = await this.getUserByID(userID);

      if (!getUser) {
        throw createError(404, 'User not found.');
      }

      getUser.password = await bcrypt.hash(password, 10);

      return getUser.save();
    } catch (error: any) {
      throw createError(500, `${error.message}`);
    }
  }

  async updateEmail(userID: string, email: string): Promise<IUser> {
    try {
      const getUser = await this.getUserByID(userID);

      if (!getUser) {
        throw createError(404, 'User not found.');
      }

      getUser.email = email;

      return await getUser.save();
    } catch (error: any) {
      throw createError(500, `${error.message}`);
    }
  }

  async deactivateAccount(userID: string): Promise<IUser> {
    try {
      const getUser = await this.getUserByID(userID);

      if (!getUser) {
        throw createError(404, 'User not found.');
      }

      getUser.status = false;

      return getUser.save();
    } catch (error: any) {
      throw createError(500, `${error.message}`);
    }
  }
}

export default new UserRepository();
