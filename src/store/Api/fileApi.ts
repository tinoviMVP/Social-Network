import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl } from '../../utils/baseUrl';

export const fileApi = createApi({
  reducerPath: 'fileApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    addPostPhoto: builder.mutation<any, any>({
      query: (payload) => ({
        url: '/add-photo',
        method: 'POST',
        body: payload,
        headers: {
          contentType: 'multipart/form-data',
        },
      }),
    }),
  }),
});

export const {useAddPostPhotoMutation} = fileApi
