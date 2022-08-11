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
};

export default attendeeApi;
