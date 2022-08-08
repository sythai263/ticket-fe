import axios from 'axios';
import StorageKeys from '../constants/storage-keys';

const baseURL = process.env.REACT_APP_API_URL;

const axiosClient = axios.create({
  baseURL,
  headers: {
    'content-type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem(StorageKeys.token)}`,
  },
});

export { axiosClient as default };
