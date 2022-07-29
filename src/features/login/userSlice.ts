import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userAPI from '../../api/userAPI';
import StorageKeys from '../../constants/storage-keys';
import Account, { User } from '../../constants/types/userType';
const initialState: User = {};

export const login = createAsyncThunk(
  'user/login',
  async (account: Account) => {
    const { data } = await userAPI.userLogin(account);
    localStorage.setItem(StorageKeys.token, data.token);
    const user: User = {
      username: data.username,
      firstName: data.firstName,
      lastName: data.lastName,
      avatar: data.avatar,
      id: data.id,
    };
    localStorage.setItem(StorageKeys.user, JSON.stringify(user));
    return user;
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    current: JSON.parse(String(localStorage.getItem(StorageKeys.user))) || {},
    isAuthentication: false,
  },
  reducers: {
    logout(state) {
      //clear local storage
      state.current = initialState;
      localStorage.removeItem(StorageKeys.token);
      localStorage.removeItem(StorageKeys.user);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(login.pending, state => {
        state.current = {};
        state.isAuthentication = false;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.current = payload;
        state.current.avatar = payload.avatar;
        state.isAuthentication = true;
      })
      .addCase(login.rejected, state => {
        state.current = initialState;
        state.isAuthentication = false;
      });
  },
});

const { actions, reducer } = userSlice;
export const { logout } = actions;
export default reducer;
