import QueryType from 'constants/types/queryType';
import queryString from 'query-string';
import axiosClient from './axiosClient';

const programApi = {
  getAll(query: QueryType) {
    const params = queryString.stringify(query);
    const url = `/api/programs?${params}`;
    return axiosClient.get(url);
  },
  getDetail(id: number) {
    const url = `/api/programs/${id}`;
    return axiosClient.get(url);
  },
};

export default programApi;
