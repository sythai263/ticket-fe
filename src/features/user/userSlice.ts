import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userAPI from 'api/user.api';
import axios from 'axios';
import StorageKeys from 'constants/storage-keys';
import { CreateUser } from 'constants/types/user/createUser';
import Account, { User, UserUpdate } from 'constants/types/user/userType';
const initialState: User = {};

export const login = createAsyncThunk(
  'user/login',
  async (account: Account, { rejectWithValue }) => {
    try {
      const response = await userAPI.userLogin(account);
      const { data } = response;
      localStorage.setItem(StorageKeys.token, data.token);
      const user: User = {
        firstName: data.firstName,
        lastName: data.lastName,
        avatar: data.avatar,
        role: data.role,
        id: data.id,
        token: data.token,
      };
      localStorage.setItem(StorageKeys.user, JSON.stringify(user));
      return user;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const signUp = createAsyncThunk(
  'user/sign-up',
  async (form: CreateUser, { rejectWithValue }) => {
    try {
      const response = await userAPI.createUser(form);
      const { data } = response;
      const user: User = {
        firstName: data.firstName,
        lastName: data.lastName,
        avatar: data.avatar,
        role: data.role,
        id: data.id,
      };
      return user;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const googleLogin = createAsyncThunk(
  'user/login-google',
  async (token: string, { rejectWithValue }) => {
    try {
      const response = await userAPI.callbackLoginGoogle(token);
      const { data } = response;
      localStorage.setItem(StorageKeys.token, token);
      const user: User = {
        firstName: data.firstName,
        lastName: data.lastName,
        avatar: data.avatar,
        role: data.role,
        id: data.id,
        token,
      };
      axios.defaults.headers.common = {
        Authorization: `Bearer ${token}`,
      };
      localStorage.setItem(StorageKeys.user, JSON.stringify(user));
      return user;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateUser = createAsyncThunk(
  'user/update',
  async (info: UserUpdate, { rejectWithValue }) => {
    try {
      const response = await userAPI.userUpdate(info);
      const { data } = response;
      const user: User = {
        firstName: data.firstName,
        lastName: data.lastName,
        avatar: data.avatar,
        role: data.role,
        id: data.id,
        token: data.token,
      };
      localStorage.setItem(StorageKeys.user, JSON.stringify(user));
      return user;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getUserInfo = createAsyncThunk(
  'user/info',
  async (usr, { rejectWithValue }) => {
    try {
      const response = await userAPI.getUser();
      const { data } = response;
      localStorage.setItem(StorageKeys.token, data.token);
      const user: User = {
        firstName: data.firstName,
        lastName: data.lastName,
        avatar: data.avatar,
        email: data.email,
        phone: data.phone,
        username: data.username,
        birthday: data.birthday,
        id: data.id,
      };
      return user;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
const token = localStorage.getItem('token');
const userSlice = createSlice({
  name: 'user',
  initialState: {
    current: JSON.parse(String(localStorage.getItem(StorageKeys.user))) || {},
    token: localStorage.getItem(StorageKeys.token),
    isAuthentication: token ? true : false,
    info: {},
  },
  reducers: {
    logout(state) {
      //clear local storage
      state.current = initialState;
      state.isAuthentication = false;
      state.token = '';
      localStorage.removeItem(StorageKeys.token);
      localStorage.removeItem(StorageKeys.user);
      axios.defaults.headers.common = {
        Authorization: '',
      };
    },
    changeAvatar(state, { payload }) {
      const init = state.current;
      init.avatar = payload;
      state.current = init;
      localStorage.removeItem(StorageKeys.user);
      localStorage.setItem(StorageKeys.user, JSON.stringify(init));
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getUserInfo.fulfilled, (state, { payload }) => {
        state.info = payload;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.token = payload.token ? payload.token : '';
        axios.defaults.headers.common = {
          Authorization: `Bearer ${state.token}`,
        };
        payload.token = undefined;
        state.current = payload;
        state.isAuthentication = true;
      })
      .addCase(login.rejected, (state, error) => {
        state.current = initialState;
        state.token = '';
        state.isAuthentication = false;
      })
      .addCase(updateUser.fulfilled, (state, { payload }) => {
        state.current = payload;
        state.isAuthentication = true;
      })
      .addCase(googleLogin.fulfilled, (state, { payload }) => {
        state.token = payload.token ? String(payload.token) : '';
        axios.defaults.headers.common = {
          Authorization: `Bearer ${state.token}`,
        };
        payload.token = undefined;
        state.current = payload;
        state.isAuthentication = true;
      })
      .addCase(signUp.fulfilled, (state, { payload }) => {
        state.current = initialState;
        state.token = '';
        state.isAuthentication = false;
      })
      .addCase(signUp.rejected, (state, error) => {
        state.current = initialState;
        state.token = '';
        state.isAuthentication = false;
      });
  },
});

const { actions, reducer } = userSlice;
export const { logout, changeAvatar } = actions;
export default reducer;
