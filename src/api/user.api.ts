import axios from 'axios';
import Account, { UserUpdate } from 'constants/types/user/userType';
import axiosClient from './axiosClient';

const userApi = {
  userLoginGoogle() {
    const url = '/api/google/auth';
    return axiosClient.get(url);
  },
  callbackLoginGoogle(token: string) {
    const baseURL = process.env.REACT_APP_API_URL;
    const url = `${baseURL}api/user`;
    const request = axios.create({
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return request.get(url);
  },
  userLogin(account: Account) {
    const url = 'api/login';
    const { username, password } = account;
    return axiosClient.post(url, {
      username,
      password,
    });
  },
  userUpdate(user: UserUpdate) {
    const url = 'api/user';
    return axiosClient.patch(url, user);
  },
  async getUser() {
    const url = `api/user`;
    const response = await axiosClient.get(url);
    return response;
  },
  getAttendee() {
    const url = `api/user/attendees`;
    return axiosClient.get(url);
  },
};

export default userApi;
