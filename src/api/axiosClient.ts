import axios from 'axios';
import StorageKeys from '../constants/storage-keys';

const baseURL = process.env.REACT_APP_API_URL;
const accessToken = localStorage.getItem(StorageKeys.token);

const axiosClient = axios.create({
  baseURL,
  headers: {
    'content-type': 'application/json',
    Authorization: `Bearer ${accessToken}`,
  },
});

export { axiosClient as default };
