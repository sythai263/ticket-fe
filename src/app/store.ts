import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import navbarReducer from 'features/navbar/navbarSlice';
import notiReducer from 'features/notification/notiSlice';
import programReducer from 'features/program/programSlice';
import userReducer from 'features/user/userSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    noti: notiReducer,
    program: programReducer,
    navbar: navbarReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
