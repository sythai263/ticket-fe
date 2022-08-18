import axios from 'axios';
const baseApi = '/api/payment';
const attendeeApi = {
  getPaymentInvoice(id: number) {
    const url = `${baseApi}/invoice/${id}`;
    return axios.patch(url);
  },
};

export default attendeeApi;
