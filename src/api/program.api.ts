import axios from 'axios';
import QueryAttendee from 'constants/types/attendee/searchAttendee';
import { CreateProgram } from 'constants/types/program/createProgram';
import { UpdateProgram } from 'constants/types/program/updateProgram';
import QueryType from 'constants/types/queryType';
import queryString from 'query-string';
const baseURL = '/api/programs';

const programApi = {
  getAll(query: QueryType) {
    const params = queryString.stringify(query);
    const url = `${baseURL}?${params}`;
    return axios.get(url);
  },
  changeStatus(id: number) {
    const url = `${baseURL}/${id}/status`;
    return axios.patch(url);
  },
  getAttendees(id: number, query?: QueryAttendee) {
    const params = queryString.stringify(query ? query : {});
    const url = `${baseURL}/${id}/attendees?${params}`;
    return axios.get(url);
  },
  getDetail(id: number) {
    const url = `${baseURL}/${id}`;
    return axios.get(url);
  },
  createProgram(program: CreateProgram) {
    const url = `${baseURL}`;
    return axios.post(url, program);
  },
  updateProgram(program: UpdateProgram) {
    const url = `${baseURL}/${program.id}`;
    return axios.patch(url, program);
  },
  deleteProgram(id: number) {
    const url = `${baseURL}/${id}`;
    return axios.delete(url);
  },
  getSales(id: number) {
    const url = `${baseURL}/${id}/sales`;
    return axios.get(url);
  },
};

export default programApi;
