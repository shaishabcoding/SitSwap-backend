import IUser from './User.interface';
import User from './User.model';

export const UserService = {
  register: async (userDate: IUser) => {
    return await User.create(userDate);
  },

  modify: async (user: IUser, userData: Partial<IUser>) => {
    Object.assign(user, userData);
    await user.save();
  },
};
