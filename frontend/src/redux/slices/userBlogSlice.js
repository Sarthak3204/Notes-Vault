import { apiSlice } from './apiSlice';
const USERS_URL = '/api/blog';

export const userBlogSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    create: builder.mutation({
      query: (formData) => ({
        url: `${USERS_URL}/create`,
        method: 'POST',
        body: formData,
      }),
    }),
    get: builder.query({
      query: (_id) => ({
        method: 'GET',
        url: `${USERS_URL}/${_id}`,
      })
    }),
    update: builder.mutation({
      query: (data) => ({
        method: 'PUT',
        url: `${USERS_URL}/${data._id}`,
        body: data
      })
    }),
    remove: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/${data._id}`,
        method: 'DELETE',
        body: data
      })
    }),
    all: builder.query({
      query: () => ({
        url: `${USERS_URL}/all`,
        method: 'GET',
      })
    }),
  })
});

export const {
  useCreateMutation,
  useUpdateMutation,
  useRemoveMutation,
  useGetQuery,
  useAllQuery,
} = userBlogSlice;