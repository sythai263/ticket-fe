import axiosClient from './axiosClient';

const programApi = {
  getAll() {
    const url = '/api/programs';
    return axiosClient.get(url);
  },
};

export default programApi;
