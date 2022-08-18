import axios from 'axios';
const baseApi = '/api/attendees';
const attendeeApi = {
  enroll(id: number) {
    const url = baseApi;
    return axios.post(url, { programId: id });
  },
  getAttendee(id: number) {
    const url = `${baseApi}/program/${id}`;
    return axios.get(url);
  },
  checkIn(id: number) {
    const url = `${baseApi}/${id}/check-in`;
    return axios.patch(url);
  },
  deleteAttendee(id: number) {
    const url = `${baseApi}/${id}`;
    return axios.delete(url);
  },
};

export default attendeeApi;
