import colors from 'colors';
import config from '../config';
import { logger } from '../shared/logger';

const adminData = {
  // name: 'bdCalling',
  // email: config.admin.email,
  // phone: '124',
  // password: config.admin.password,
  // avatar: 'https://picsum.photos/200',
};

const seedAdmin = async () => {
  const adminExist = !!(await Admin.findOne());

  if (!adminExist) {
    logger.info(colors.yellow('📝 first admin is creating...'));
    await Admin.create(adminData);
    logger.info(colors.green('✔ admin created successfully!'));
  }
};

export default seedAdmin;
