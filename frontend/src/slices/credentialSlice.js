import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const credentialApi = createApi({
  reducerPath: "credentialApi",
  tagTypes: ["credential"],
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/users/credential",
  }),
  endpoints: (builder) => ({
    getAllCredentials: builder.query({
      query: () => ({
        url: "/",
        method: "GET",
      }),
      providesTags: ["credential"],
    }),
    getCredentialsById: builder.query({
      query: (id) => ({
        url: `/${id}`,
        method: "GET",
      }),
    }),
    createCredential: builder.mutation({
      query: (data) => ({
        url: "/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["credential"],
    }),
    deleteCredential: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["credential"],
    }),
  }),
});

export const {
  useGetAllCredentialsQuery,
  useCreateCredentialMutation,
  useGetCredentialsByIdQuery,
  useDeleteCredentialMutation,
} = credentialApi;
