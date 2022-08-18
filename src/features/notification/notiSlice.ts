import { createSlice } from '@reduxjs/toolkit';
const notiReducer = createSlice({
  name: 'noti',
  initialState: {
    alert: false,
    loading: false,
    data: { color: 'success', message: '' },
  },
  reducers: {
    showAlert(state, { payload }) {
      state.data = payload;
      state.alert = true;
    },
    hideAlert(state) {
      state.alert = false;
    },
    showLoading(state) {
      state.loading = true;
    },
    hideLoading(state) {
      state.loading = false;
    },
  },
});
const { actions, reducer } = notiReducer;
export const { showAlert, hideAlert, hideLoading, showLoading } = actions;
export default reducer;
