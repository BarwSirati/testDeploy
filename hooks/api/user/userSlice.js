import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND}/users`,
  }),
  endpoints: (builder) => ({
    getCurrent: builder.query({
      query: (token) => ({
        url: "/current/info",
        method: "GET",
        headers: {
          Authorization: token,
        },
      }),
    }),
    getTopRank: builder.query({
      query: (token) => ({
        url: "/score/ranking",
        method: "GET",
        headers: {
          Authorization: token,
        },
      }),
    }),
    getRanking: builder.query({
      query: (token) => ({
        url: `/score/board`,
        method: "GET",
        headers: {
          Authorization: token,
        },
      }),
    }),
    updateProfile: builder.mutation({
      query: ({ token, data }) => ({
        url: `/${data.id}`,
        method: "PATCH",
        body: data,
        headers: {
          Authorization: token,
        },
      }),
    }),
  }),
});

export const {
  useGetCurrentQuery,
  useGetRankingQuery,
  useGetTopRankQuery,
  useUpdateProfileMutation,
} = userApi;
