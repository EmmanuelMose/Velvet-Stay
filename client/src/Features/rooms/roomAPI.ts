//for admin dashboard

import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";
import { ApiDomain } from "../../utils/APIDomain";
import type { RootState } from "../../app/store";

export type TRoom = {
  roomId: number;
  hotelId: number;
  roomType: string;
  pricePerNight: number;
  capacity: number;
  amenities: string;
  isAvailable: boolean;
  createdAt?: string;
};

export const roomsApi = createApi({
  reducerPath: "roomsApi",
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
  tagTypes: ["Rooms"],
  endpoints: (builder) => ({
    getRooms: builder.query<TRoom[], void>({
      query: () => "/rooms",
      providesTags: ["Rooms"],
    }),

    getRoomById: builder.query<TRoom, number>({
      query: (roomId) => `/room/${roomId}`,
      providesTags: (_result, _err, roomId) => [{ type: "Rooms", id: roomId }],
    }),

    createRoom: builder.mutation<TRoom, Partial<TRoom>>({
      query: (roomData) => ({
        url: "/room",
        method: "POST",
        body: roomData,
      }),
      invalidatesTags: ["Rooms"],
    }),

    updateRoom: builder.mutation<TRoom, { roomId: number; roomData: Partial<TRoom> }>({
      query: ({ roomId, roomData }) => ({
        url: `/room/${roomId}`,
        method: "PUT",
        body: roomData,
      }),
      invalidatesTags: (_result, _err, { roomId }) => [
        { type: "Rooms", id: roomId },
        "Rooms",
      ],
    }),

    deleteRoom: builder.mutation<{ success: boolean }, number>({
      query: (roomId) => ({
        url: `/room/${roomId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Rooms"],
    }),
  }),
});

export const {
  useGetRoomsQuery,
  useGetRoomByIdQuery,
  useCreateRoomMutation,
  useUpdateRoomMutation,
  useDeleteRoomMutation,
} = roomsApi;
