import config from '../../../config';
import IUser from './User.interface';

export const firstAdminData: Partial<IUser> = {
  name: config.admin.email as string,
  password: config.admin.password as string,
  email: config.admin.email as string,
  avatar: '/logo.png',
  role: 'admin',
};
