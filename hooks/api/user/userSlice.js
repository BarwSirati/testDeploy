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
  }),
});

export const { useGetCurrentQuery } = userApi;
