import axios from 'axios';
import config from '../config';

async function validateEduEmail(email: string): Promise<boolean> {
  const response = await axios.post(
    'https://api.apyhub.com/validate/academic-email',
    { email: email },
    { headers: { 'apy-token': config.apyhub_api as string } },
  );

  return response.data.success;
}

export default validateEduEmail;
