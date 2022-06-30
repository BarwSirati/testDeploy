import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND}/users`,
  }),
  endpoints: (builder) => ({
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
  }),
});

export const { useGetTopRankQuery, useGetRankingQuery } = usersApi;
