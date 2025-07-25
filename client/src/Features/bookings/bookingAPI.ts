import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createApi } from "@reduxjs/toolkit/query/react";
import { ApiDomain } from "../../utils/APIDomain";
import type { RootState } from "../../app/store";

// Booking type based on backend
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

// Booking creation payload (omit auto-generated fields)
export type TBookingCreate = Omit<TBooking, "bookingId" | "createdAt" | "updatedAt">;

// Pagination response type
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
    // Create booking
    createBooking: builder.mutation<TBooking, TBookingCreate>({
      query: (bookingData) => ({
        url: "/booking",
        method: "POST",
        body: bookingData,
      }),
      invalidatesTags: ["Bookings"],
    }),

    // Get paginated bookings
    getBookings: builder.query<TBookingResponse, TPaginationParams>({
      query: ({ page = 1, limit = 10 } = {}) => ({
        url: "/bookings",
        params: { page, limit },
      }),
      providesTags: ["Bookings"],
    }),

    // Get all bookings
    getAllBookings: builder.query<TBooking[], void>({
      query: () => "/bookings",
      providesTags: ["Bookings"],
    }),

    // Get booking by ID
    getBookingById: builder.query<TBooking, number>({
      query: (id) => `/booking/${id}`,
      providesTags: ["Bookings"],
    }),

    // Update booking
    updateBooking: builder.mutation<
      TBooking,
      { bookingId: number; updatedData: Partial<TBookingCreate> }
    >({
      query: ({ bookingId, updatedData }) => ({
        url: `/booking/${bookingId}`,
        method: "PUT",
        body: updatedData,
      }),
      invalidatesTags: ["Bookings"],
    }),

    // Delete booking
    deleteBooking: builder.mutation<{ success: boolean }, number>({
      query: (id) => ({
        url: `/booking/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Bookings"],
    }),
  }),
});

// Export hooks
export const {
  useCreateBookingMutation,
  useGetBookingsQuery,
  useGetAllBookingsQuery,
  useGetBookingByIdQuery,
  useUpdateBookingMutation,
  useDeleteBookingMutation,
} = bookingApi;
