import QueryAttendee from 'constants/types/attendee/searchAttendee';
import { CreateProgram } from 'constants/types/program/createProgram';
import { UpdateProgram } from 'constants/types/program/updateProgram';
import QueryType from 'constants/types/queryType';
import queryString from 'query-string';
import axiosClient from './axiosClient';
const baseURL = '/api/programs';

const programApi = {
  getAll(query: QueryType) {
    const params = queryString.stringify(query);
    const url = `${baseURL}?${params}`;
    return axiosClient.get(url);
  },
  getAttendees(id: number, query?: QueryAttendee) {
    const params = queryString.stringify(query ? query : {});
    const url = `${baseURL}/${id}/attendees?${params}`;
    return axiosClient.get(url);
  },
  getDetail(id: number) {
    const url = `${baseURL}/${id}`;
    return axiosClient.get(url);
  },
  createProgram(program: CreateProgram) {
    const url = `${baseURL}`;
    return axiosClient.post(url, program);
  },
  updateProgram(program: UpdateProgram) {
    const url = `${baseURL}/${program.id}`;
    return axiosClient.patch(url, program);
  },
};

export default programApi;
