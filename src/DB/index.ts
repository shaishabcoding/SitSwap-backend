import colors from 'colors';
import { logger } from '../shared/logger';
import User from '../app/modules/user/User.model';
import { firstAdminData } from '../app/modules/user/User.constant';

const seedAdmin = async () => {
  const adminExist = !!(await User.findOne({
    role: 'admin',
  }));

  if (!adminExist) {
    logger.info(colors.yellow('📝 first admin is creating...'));
    await User.create(firstAdminData);
    logger.info(colors.green('✔ admin created successfully!'));
  }
};

export default seedAdmin;
