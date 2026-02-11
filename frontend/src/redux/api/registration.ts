import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Registration,} from '../types';
export const apiregistration= createApi({
  reducerPath: 'apiregistration',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api/registrations',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as any).auth.token; 
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllRegistrations: builder.query<Registration[], void>({
      query: () => '/all',
    }),
   deleteRegistration: builder.mutation<void, string>({
      query: (registrationId) => ({
        url: `/${registrationId}`,
        method: 'DELETE',
      }),
    }),
      searchRegistrationsByTitle: builder.query<Registration[], string>({
      query: (titre) => `/search?titre=${titre}`,
    }),
    addRegistration: builder.mutation<Registration, { formationId: string }>({
      query: (body) => ({
        url: '/',
        method: 'POST',
        body,
      }),
    }),
    getUserRegistrations: builder.query<Registration[], void>({
      query: () => '/my', 
    }),
  }),
});
export const {
  useGetAllRegistrationsQuery,
  useDeleteRegistrationMutation,
  useSearchRegistrationsByTitleQuery,
 useAddRegistrationMutation,
   useGetUserRegistrationsQuery,
} = apiregistration;
