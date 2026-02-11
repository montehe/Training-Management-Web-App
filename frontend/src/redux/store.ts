import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import { apiUser } from './api/user'; 
import { apiFormation } from './api/formation';
import { apiregistration } from './api/registration';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [apiUser.reducerPath]: apiUser.reducer,
    [apiFormation.reducerPath]: apiFormation.reducer,
    [apiregistration.reducerPath]: apiregistration.reducer,


  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiUser.middleware ,  apiFormation.middleware , apiregistration.middleware), 
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
