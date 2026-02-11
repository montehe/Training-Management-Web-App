import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {Formation} from "../types"

export const apiFormation = createApi({
  reducerPath: 'apiFormation',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api/formations',
    prepareHeaders: (headers, { getState }) => {
      const { token } = (getState() as { auth: { token: string | null } }).auth;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    addFormation: builder.mutation<Formation, Formation>({
      query: (body) => ({
        url: '/',
        method: 'POST',
        body,
      }),
    }),
    getFormations: builder.query<Formation[], void>({
      query: () => '/',
    }),
    getFormationById: builder.query<Formation, string>({
      query: (id) => `/${id}`,
    }),
updateFormation: builder.mutation<Formation, { id: string; body: Formation }>({
  query: ({ id, body }) => ({
    url: `/${id}`, 
    method: 'PUT',
    body,
  }),
}),
    deleteFormation: builder.mutation<void, string>({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
    }),
searchFormations: builder.query<Formation[], string>({
      query: (query) => `/search?query=${query}`,
    }),
  }),
});

export const {
  useAddFormationMutation,
  useGetFormationsQuery,
  useGetFormationByIdQuery,
  useUpdateFormationMutation,
  useDeleteFormationMutation,
  useSearchFormationsQuery,
} = apiFormation;
