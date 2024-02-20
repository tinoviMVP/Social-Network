import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../../utils/baseUrl";
import { PostItem } from "../../Types/post";

interface getPostListResult {
  status: number;
  message: PostItem[];
}

export const postApi = createApi({
  reducerPath: "postApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getPostList: builder.query({
      query: () => ({
        url: "/post",
        method: "GET",
      }),
    }),
    getPostListItem: builder.query({
      query: (postId: string) => ({
        url: `/post/?post_id=${postId}`,
        method: "GET",
      }),
    }),
    addNewPost: builder.mutation({
      query: (payload) => ({
        url: "/post",
        method: "POST",
        body: payload,
      }),
    }),
    editPost: builder.mutation({
      query: (payload: { post_id: number; new_text: string }) => ({
        url: `/post/?post_id=${payload.post_id}`,
        method: "POST",
        body: payload,
      }),
    }),
    deletePost: builder.mutation({
      query: (payload: { post_id: number }) => ({
        url: `/post/?post_id=${payload.post_id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useLazyGetPostListQuery,
  useAddNewPostMutation,
  useGetPostListItemQuery,
  useEditPostMutation,
  useDeletePostMutation
} = postApi;
