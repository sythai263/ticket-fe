import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import notiReducer from 'features/notification/notiSlice';
import userReducer from '../features/login/userSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    noti: notiReducer,
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
