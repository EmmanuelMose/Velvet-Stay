// src/Features/users/usersAPI.ts

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiDomain } from "../../../src/utils/APIDomain";

// Types
export type TUser = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  contactPhone: string;
  address: string;
  role: string;
  isVerified: boolean;
  verificationCode?: string;
};

export type TverifyUser = {
  email: string;
  verificationCode: string;
};

// API
export const usersAPI = createApi({
  reducerPath: "usersAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: ApiDomain,
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    // Register user (auth route)
    createUsers: builder.mutation<TUser, Partial<TUser>>({
      query: (user) => ({
        url: "/auth/register",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["User"],
    }),

    // Verify user (auth route)
    VerifyUser: builder.mutation<{ message: string }, TverifyUser>({
      query: (data) => ({
        url: "/auth/verify",
        method: "POST",
        body: data,
      }),
    }),

    // Get all users
    getAllUsers: builder.query<TUser[], void>({
      query: () => "/users",
      providesTags: ["User"],
    }),

    // Update user by ID
    updateUser: builder.mutation<TUser, { id: number; data: Partial<TUser> }>({
      query: ({ id, data }) => ({
        url: `/user/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

    // Delete user by ID
    deleteUser: builder.mutation<{ message: string }, number>({
      query: (id) => ({
        url: `/user/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

// Hooks export
export const {
  useCreateUsersMutation,
  useVerifyUserMutation,
  useGetAllUsersQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = usersAPI;
