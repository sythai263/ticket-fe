import axiosClient from './axiosClient';
const baseApi = '/api/attendees';
const attendeeApi = {
  enroll(id: number) {
    const url = baseApi;
    return axiosClient.post(url, { programId: id });
  },
  getAttendee(id: number) {
    const url = `${baseApi}/program/${id}`;
    return axiosClient.get(url);
  },
  checkIn(id: number) {
    const url = `${baseApi}/${id}/check-in`;
    return axiosClient.patch(url);
  },
  deleteAttendee(id: number) {
    const url = `${baseApi}/${id}`;
    return axiosClient.delete(url);
  },
};

export default attendeeApi;
