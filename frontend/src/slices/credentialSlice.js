import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const credentialApi = createApi({
  reducerPath: "credentialApi",
  tagTypes: ["credential"],
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/user/",
  }),
  endpoints: (builder) => ({
    getAllCredentials: builder.query({
      query: (userid) => ({
        url: `/${userid}`,
        method: "GET",
      }),
      providesTags: ["credential"],
    }),
    getCredentialsById: builder.query({
      query: (id) => ({
        url: `/view-account/${id}`,
        method: "GET",
      }),
    }),
    createCredential: builder.mutation({
      query: (data) => ({
        url: "/add-account",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["credential"],
    }),
    deleteCredential: builder.mutation({
      query: (id) => ({
        url: `/delete-account/${id}`,
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
