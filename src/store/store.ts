import { configureStore } from '@reduxjs/toolkit';
import userSlice from './userSlice';
import authSlice from './authSlice';
import { authApi } from './Api/authApi';
import { postApi } from './Api/postApi';
import { fileApi } from './Api/fileApi';

export const store = configureStore({
  reducer: {
    user: userSlice,
    auth: authSlice,
    [authApi.reducerPath]: authApi.reducer,
    [postApi.reducerPath]: postApi.reducer,
    [fileApi.reducerPath]: fileApi.reducer,
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat([
      authApi.middleware,
       postApi.middleware,
      fileApi.middleware,
    ]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
