import { createSlice } from '@reduxjs/toolkit';

const navbarReducer = createSlice({
  name: 'navbar',
  initialState: {
    active: 1,
  },
  reducers: {
    setActive(state, { payload }) {
      state.active = payload;
    },
  },
});
const { actions, reducer } = navbarReducer;
export const { setActive } = actions;
export default reducer;
