import axios from 'axios';
import Account, { UserUpdate } from 'constants/types/user/userType';

const userApi = {
  userLoginGoogle() {
    const url = '/api/google/auth';
    return axios.get(url);
  },
  callbackLoginGoogle(token: string) {
    const url = `api/user`;
    axios.defaults.headers.common = {
      Authorization: `Bearer ${token}`,
    };

    return axios.get(url);
  },
  userLogin(account: Account) {
    const url = 'api/login';
    const { username, password } = account;
    return axios.post(url, {
      username,
      password,
    });
  },
  userUpdate(user: UserUpdate) {
    const url = 'api/user';
    return axios.patch(url, user);
  },
  async getUser() {
    const url = `api/user`;
    const response = await axios.get(url);
    return response;
  },
  getAttendee() {
    const url = `api/user/attendees`;
    return axios.get(url);
  },
};

export default userApi;
