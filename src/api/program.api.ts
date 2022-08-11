import axiosClient from './axiosClient';

const programApi = {
  getAll() {
    const url = '/api/programs';
    return axiosClient.get(url);
  },
  getDetail(id: number) {
    const url = `/api/programs/${id}`;
    return axiosClient.get(url);
  },
};

export default programApi;
