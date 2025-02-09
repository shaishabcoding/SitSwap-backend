import IUser from '../app/modules/user/User.interface';

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
      authData?: Record<any, any>;
    }
  }
}
