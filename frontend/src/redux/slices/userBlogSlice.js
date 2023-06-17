import { apiSlice } from './apiSlice';
const USERS_URL = '/api/blog';

export const userBlogSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    create: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/create`,
        method: 'POST',
        body: data
      })
    }),
    update: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/:id`,
        method: 'PUT',
        body: data
      })
    }),
    delete: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/:id`,
        method: 'DELETE',
        body: data
      })
    }),
    get: builder.query({
      query: () => ({
        url: `${USERS_URL}/get`,
        method: 'GET',
      })
    }),
  })
});

export const {
  useCreateMutation,
  useUpdateMutation,
  useDeleteMutation,
  useGetQuery,
} = userBlogSlice;