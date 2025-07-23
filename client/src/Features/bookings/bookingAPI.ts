// src/Features/bookings/bookingAPI.ts

import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";
import { ApiDomain } from "../../utils/APIDomain";
import type { RootState } from "../../app/store";

// Booking type matching backend schema (camelCase)
export type TBooking = {
  bookingId: number;
  userId: number;
  roomId: number;
  checkInDate: string;
  checkOutDate: string;
  totalAmount: number;
  bookingStatus: "Pending" | "Confirmed" | "Cancelled";
  createdAt: string;
  updatedAt: string;
};

// Pagination types
export type TPaginationInfo = {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
};

export type TBookingResponse = {
  bookings: TBooking[];
  pagination: TPaginationInfo;
};

export type TPaginationParams = {
  page?: number;
  limit?: number;
};

export const bookingApi = createApi({
  reducerPath: "bookingApi",
  baseQuery: fetchBaseQuery({
    baseUrl: ApiDomain,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).user.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Bookings"],
  endpoints: (builder) => ({
    // Create Booking
    createBooking: builder.mutation<
      TBooking,
      Omit<TBooking, "bookingId" | "createdAt" | "updatedAt">
    >({
      query: (newBooking) => ({
        url: "/booking",
        method: "POST",
        body: newBooking,
      }),
      invalidatesTags: ["Bookings"],
    }),

    // Get Bookings (Paginated)
    getBookings: builder.query<TBookingResponse, TPaginationParams>({
      query: ({ page = 1, limit = 10 } = {}) => ({
        url: "/bookings",
        params: { page, limit },
      }),
      providesTags: ["Bookings"],
    }),

    // Get All Bookings (Unpaginated)
    getAllBookings: builder.query<TBooking[], void>({
      query: () => "/bookings",
      providesTags: ["Bookings"],
    }),

    // Get Booking by ID
    getBookingById: builder.query<TBooking, number>({
      query: (bookingId) => `/booking/${bookingId}`,
      providesTags: ["Bookings"],
    }),

    // Update Booking
    updateBooking: builder.mutation<
      TBooking,
      {
        bookingId: number;
        updatedData: Partial<
          Omit<TBooking, "bookingId" | "createdAt" | "updatedAt">
        >;
      }
    >({
      query: ({ bookingId, updatedData }) => ({
        url: `/booking/${bookingId}`,
        method: "PUT",
        body: updatedData,
      }),
      invalidatesTags: ["Bookings"],
    }),

    // Delete Booking
    deleteBooking: builder.mutation<{ success: boolean }, number>({
      query: (bookingId) => ({
        url: `/booking/${bookingId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Bookings"],
    }),
  }),
});

export const {
  useCreateBookingMutation,
  useGetBookingsQuery,
  useGetAllBookingsQuery,
  useGetBookingByIdQuery,
  useUpdateBookingMutation,
  useDeleteBookingMutation,
} = bookingApi;
