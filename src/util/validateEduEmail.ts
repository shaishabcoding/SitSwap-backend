import axios from 'axios';
import config from '../config';

async function validateEduEmail(email: string): Promise<boolean> {
  const { data } = await axios.request({
    method: 'POST',
    url: 'https://api.apyhub.com//validate/email/academic',
    headers: {
      'Content-Type': 'application/json',
      'apy-token': config.apyhub_api,
    },
    data: { email },
  });

  return data.success;
}

export default validateEduEmail;
