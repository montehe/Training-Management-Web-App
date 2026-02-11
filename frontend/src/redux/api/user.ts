import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AuthState } from '../slices/authSlice';
import { User } from '../types';
export const apiUser = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api/users',
    prepareHeaders: (headers, { getState }) => {
      const { token } = (getState() as { auth: AuthState }).auth;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    register: builder.mutation<void, { username: string; email: string; password: string; confirmPassword: string; name: string; tel: string; adresse: string; fonction: string }>({
      query: (body) => ({
        url: '/register',
        method: 'POST',
        body,
      }),
    }),
    login: builder.mutation<{ user: AuthState['user']; token: AuthState['token'] }, { email: string; password: string }>({
      query: (body) => ({
        url: '/login',
        method: 'POST',
        body,
      }),
    }),
    getProfile: builder.query<User, void>({
      query: () => '/profile',  // No need for userId here
    }),
    updateProfile: builder.mutation<User, Partial<User>>({
      query: (patch) => ({
        url: '/update-profile',
        method: 'PUT',
        body: patch,
      }),
    }),
       getAllUsers: builder.query<User[], void>({
      query: () => '/get-all-users',
    }),
    deleteUser: builder.mutation<void, string>({
      query: (userId) => ({
        url: `/delete/${userId}`,
        method: 'DELETE',
      }),
    }),
    forgotPassword: builder.mutation<void, { email: string }>({
      query: (body) => ({
        url: '/forgot-password',
        method: 'POST',
        body,
      }),
    }),
    
  resetPassword: builder.mutation<void, { token: string; newPassword: string; confirmNewPassword: string }>({
      query: (body) => ({
        url: `/reset-password/${body.token}`,
        method: 'POST',
        body: {
          newPassword: body.newPassword,
          confirmNewPassword: body.confirmNewPassword,
        },
      }),
    }),
  }),
  
});


export const { useRegisterMutation, useLoginMutation,useGetProfileQuery, useGetAllUsersQuery, useDeleteUserMutation, useUpdateProfileMutation,useForgotPasswordMutation , useResetPasswordMutation} = apiUser;
