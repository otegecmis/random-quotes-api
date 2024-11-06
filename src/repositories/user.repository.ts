import User, { IUser } from '../models/User';

class UserRepository {
  async createUser(user: IUser): Promise<IUser> {
    return await User.create(user);
  }

  async getUserByEmail(email: string): Promise<IUser | null> {
    return await User.findOne({ email });
  }
}

export default new UserRepository();
