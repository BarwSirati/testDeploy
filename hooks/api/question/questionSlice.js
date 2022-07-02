import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const questionApi = createApi({
  reducerPath: "questionApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND}/question`,
  }),
  endpoints: (builder) => ({
    getQuestion: builder.query({
      query: ({ token, id }) => ({
        url: `/${id}`,
        method: "GET",
        headers: {
          Authorization: token,
        },
      }),
    }),
    getQuestions: builder.query({
      query: (token) => ({
        url: "",
        method: "GET",
        headers: {
          Authorization: token,
        },
      }),
    }),
  }),
});

export const { useGetQuestionQuery, useGetQuestionsQuery } = questionApi;
