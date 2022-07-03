import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const submitApi = createApi({
  reducerPath: "submitApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND}/submit`,
  }),
  endpoints: (builder) => ({
    getSubmit: builder.query({
      query: ({ token, userId, questionId }) => ({
        url: `/${questionId}/${userId}`,
        method: "GET",
        headers: {
          Authorization: token,
        },
      }),
    }),
  }),
});

export const { useGetSubmitQuery } = submitApi;
