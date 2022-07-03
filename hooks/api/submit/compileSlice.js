import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const compileApi = createApi({
  reducerPath: "compileApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_COMPILER}`,
  }),
  endpoints: (builder) => ({
    compileCode: builder.mutation({
      query: ({ token, data }) => ({
        url: "/compile",
        method: "POST",
        body: data,
        headers: {
          Authorization: token,
        },
      }),
    }),
  }),
});

export const { useCompileCodeMutation } = compileApi;
