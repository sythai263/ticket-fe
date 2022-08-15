import axiosClient from './axiosClient';
const baseApi = '/api/payment';
const attendeeApi = {
  getPaymentInvoice(id: number) {
    const url = `${baseApi}/invoice/${id}`;
    return axiosClient.patch(url);
  },
};

export default attendeeApi;
