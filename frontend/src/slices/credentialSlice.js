import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const credentialApi = createApi({
  reducerPath: "credentialApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/users/credential",
  }),
  endpoints: (builder) => ({
    getAllCredentials: builder.query({
      query: () => ({
        url: "/",
        method: "GET",
      }),
    }),
    createCredential: builder.mutation({
      query: (data) => ({
        url: "/",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useGetAllCredentialsQuery, useCreateCredentialMutation } =
  credentialApi;
