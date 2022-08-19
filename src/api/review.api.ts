import axios from 'axios';
import QueryType from 'constants/types/queryType';
import { UpdateReview } from 'constants/types/review/updateReview';
import queryString from 'query-string';
const baseApi = '/api/reviews/program';
const reviewApi = {
  getReview(id: number, query: QueryType) {
    const params = queryString.stringify(query);
    const url = `${baseApi}/${id}?${params}`;
    return axios.get(url);
  },

  updateReview(data: UpdateReview) {
    const url = `${baseApi}`;
    return axios.patch(url, data);
  },

  deleteReview(id: number) {
    const url = `${baseApi}/${id}`;
    return axios.delete(url);
  },
};

export default reviewApi;
