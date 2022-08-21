import axios from 'axios';
import { CreateUser } from 'constants/types/user/createUser';
import { PasswordType } from 'constants/types/user/passwordType';
import { ResetPassword } from 'constants/types/user/ResetPassword';
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
  createUser(user: CreateUser) {
    const url = 'api/user';
    return axios.post(url, user);
  },
  changeAvatar(file: any) {
    const data = new FormData();
    data.append('avatar', file);
    const url = `api/user/avatar`;
    return axios.post(url, data);
  },
  changePassword(info: PasswordType) {
    const url = `api/user/password`;
    return axios.patch(url, info);
  },
  resetPassword(info: ResetPassword) {
    const url = `api/user/password`;
    return axios.post(url, info);
  },
};

export default userApi;
