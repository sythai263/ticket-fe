import axiosClient from './axiosClient';

const productApi = {
  getAll() {
    const url = '/api/products';
    return axiosClient.get(url);
  },
};

export default productApi;
