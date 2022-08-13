import { createSlice } from '@reduxjs/toolkit';

const programReducer = createSlice({
  name: 'program',
  initialState: {
    refresh: false,
  },
  reducers: {
    refreshList(state) {
      state.refresh = !state.refresh;
    },
  },
});
const { actions, reducer } = programReducer;
export const { refreshList } = actions;
export default reducer;
