//for the users dashboard

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiDomain } from "../../utils/APIDomain";

export type TRoom = {
  roomId: number;
  hotelId: number;
  roomType: string;
  pricePerNight: number;
  capacity: number;
  amenities: string;
  isAvailable: boolean;
  createdAt: string;
};

export const roomAPI = createApi({
  reducerPath: "roomsAPI",
  baseQuery: fetchBaseQuery({ baseUrl: ApiDomain }),
  endpoints: (builder) => ({
    getAvailableRoomsByHotel: builder.query<TRoom[], number>({
      query: (hotelId) => `/rooms/available/${hotelId}`,
    }),
  }),
});

export const { useGetAvailableRoomsByHotelQuery } = roomAPI;
