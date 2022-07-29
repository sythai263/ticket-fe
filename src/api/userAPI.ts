import Account from '../constants/types/userType';
import axiosClient from './axiosClient';

const userApi = {
  userLoginGoogle() {
    const url = '/api/google/auth';
    return axiosClient.get(url);
  },
  userLogin(account: Account) {
    const url = 'api/login';
    const { username, password } = account;
    return axiosClient.post(url, {
      username,
      password,
    });
  },
  async getUser() {
    const url = `api/user`;
    const response = await axiosClient.get(url);
    return response;
  },
};

export default userApi;
