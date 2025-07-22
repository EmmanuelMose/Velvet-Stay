// src/Features/bookings/bookingAPI.ts
import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";
import { ApiDomain } from "../../utils/APIDomain";
import type { RootState } from "../../app/store";

// Booking type matching backend schema
export type TBooking = {
  BookingId: number;
  UserId: number;
  RoomId: number;
  CheckInDate: string;
  CheckOutDate: string;
  TotalAmount: number;
  BookingStatus: "Pending" | "Confirmed" | "Cancelled";
  CreatedAt: string;
  UpdatedAt: string;
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
    createBooking: builder.mutation<TBooking, Omit<TBooking, "BookingId" | "CreatedAt" | "UpdatedAt">>({
      query: (newBooking) => ({
        url: "/booking",
        method: "POST",
        body: newBooking,
      }),
      invalidatesTags: ["Bookings"],
    }),

    // Get Bookings with Pagination
    getBookings: builder.query<TBookingResponse, TPaginationParams>({
      query: ({ page = 1, limit = 10 } = {}) => ({
        url: "/bookings",
        params: { page, limit },
      }),
      providesTags: ["Bookings"],
    }),

    // Get All Bookings (no pagination)
    getAllBookings: builder.query<TBooking[], void>({
      query: () => "/bookings",
      providesTags: ["Bookings"],
    }),

    // Get Booking by ID
    getBookingById: builder.query<TBooking, number>({
      query: (bookingId) => `/booking/${bookingId}`,
      providesTags: ["Bookings"],
    }),

    // Update Full Booking
    updateBooking: builder.mutation<
      TBooking,
      { BookingId: number; updatedData: Partial<Omit<TBooking, "BookingId" | "CreatedAt" | "UpdatedAt">> }
    >({
      query: ({ BookingId, updatedData }) => ({
        url: `/booking/${BookingId}`,
        method: "PUT",
        body: updatedData,
      }),
      invalidatesTags: ["Bookings"],
    }),

    // Delete Booking
    deleteBooking: builder.mutation<{ success: boolean }, number>({
      query: (BookingId) => ({
        url: `/booking/${BookingId}`,
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
