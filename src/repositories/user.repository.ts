import createError from 'http-errors';

import User, { IUser } from '../models/User';

class UserRepository {
  async createUser(user: IUser): Promise<IUser> {
    try {
      return await User.create(user);
    } catch (error: any) {
      if (error.code === 11000 && error.keyPattern?.email) {
        throw createError(400, 'Please use a different email.');
      }

      throw createError(500, 'Unable to create the user at the moment.');
    }
  }

  async getUserByEmail(email: string): Promise<IUser | null> {
    try {
      return await User.findOne({ email });
    } catch (error) {
      throw createError(500, 'Unable to fetch the user at the moment.');
    }
  }
}

export default new UserRepository();
