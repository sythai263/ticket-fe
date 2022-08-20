import axios from 'axios';
const baseApi = '/api/upload';
const uploadApi = {
  uploadImage(file: any, mode: string) {
    const data = new FormData();
    data.append('file', file);
    const url = `${baseApi}/${mode}/image`;
    return axios.post(url, data);
  },
};

export default uploadApi;
