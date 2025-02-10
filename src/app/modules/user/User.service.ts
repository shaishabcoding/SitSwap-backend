import { StatusCodes } from 'http-status-codes';
import ServerError from '../../../errors/ServerError';
import deleteFile from '../../../shared/deleteFile';
import IUser from './User.interface';
import User from './User.model';

export const UserService = {
  register: async (userDate: IUser) => {
    return await User.create(userDate);
  },

  modify: async (user: IUser, userData: Partial<IUser>) => {
    const imagesToDelete = user.avatar;

    Object.assign(user, userData);
    await user.save();

    if (userData.avatar) await deleteFile(imagesToDelete); // ^ clean up old image
  },

  delete: async (userId: string) => {
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser)
      throw new ServerError(StatusCodes.NOT_FOUND, 'User not found.');

    await deleteFile(deletedUser.avatar); // ^ clean up image
  },
};
