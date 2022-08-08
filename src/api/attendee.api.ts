import axiosClient from './axiosClient';
const baseApi = '/api/attendees';
const attendeeApi = {
  enroll(id: number) {
    const url = baseApi;
    return axiosClient.post(url, { programId: id });
  },
  getAttendee(id: number) {
    const url = `${baseApi}/${id}`;
    return axiosClient.post(url);
  },
};

export default attendeeApi;
