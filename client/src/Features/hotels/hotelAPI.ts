//this is for admin dashboard

import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";
import { ApiDomain } from "../../utils/APIDomain";
import type { RootState } from "../../app/store";

export type THotel = {
  hotelId: number;
  name: string;
  location: string;
  address: string;
  contactPhone: string;
  category: string;
  imgUrl: string;
  rating: number;
  description: string;
  createdAt: string;
  updatedAt: string;
};

export const hotelApi = createApi({
  reducerPath: "hotelApi",
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
  tagTypes: ["Hotels"],
  endpoints: (builder) => ({
    getHotels: builder.query<THotel[], void>({
      query: () => "/hotels",
      providesTags: ["Hotels"],
    }),

    createHotel: builder.mutation<THotel, Partial<THotel>>({
      query: (newHotel) => ({
        url: "/hotel",
        method: "POST",
        body: newHotel,
      }),
      invalidatesTags: ["Hotels"],
    }),

    updateHotel: builder.mutation<THotel, { hotelId: number; data: Partial<THotel> }>({
      query: ({ hotelId, data }) => ({
        url: `/hotel/${hotelId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Hotels"],
    }),

    deleteHotel: builder.mutation<{ success: boolean }, number>({
      query: (hotelId) => ({
        url: `/hotel/${hotelId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Hotels"],
    }),
  }),
});

export const {
  useGetHotelsQuery,
  useCreateHotelMutation,
  useUpdateHotelMutation,
  useDeleteHotelMutation,
} = hotelApi;
