import { createSlice } from '@reduxjs/toolkit';

const programReducer = createSlice({
  name: 'program',
  initialState: {
    refresh: false,
    refreshSingle: false,
  },
  reducers: {
    refreshList(state) {
      state.refresh = !state.refresh;
    },
    refreshSingle(state) {
      state.refreshSingle = !state.refreshSingle;
    },
  },
});
const { actions, reducer } = programReducer;
export const { refreshList } = actions;
export default reducer;
