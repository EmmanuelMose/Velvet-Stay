//user dashboard
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiDomain } from "../../utils/APIDomain";

export type THotel = {
  hotelId: number;
  name: string;
  location: string;
  address: string;
  contactPhone: string;
  category: string;
  imgUrl: string;
  rating: number;
  createdAt: string;
  updatedAt: string;
  description: string;
};

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

export const hotelsAPI = createApi({
  reducerPath: "hotelsAPI",
  baseQuery: fetchBaseQuery({ baseUrl: ApiDomain }),
  endpoints: (builder) => ({
    // Get all hotels
    getHotels: builder.query<THotel[], void>({
      query: () => `/hotels`,
    }),

    // Get hotels by location
    getHotelsByLocation: builder.query<THotel[], string>({
      query: (location) => `/hotels/${location}`,
    }),

    // Get hotels by rating
    getHotelsByRating: builder.query<THotel[], string>({
      query: (rating) => `/hotels/rating/${rating}`,
    }),

    //Get all rooms (not just available) by hotelId
    getRoomsByHotel: builder.query<TRoom[], number>({
      query: (hotelId) => `/rooms/hotel/${hotelId}`,
    }),
  }),
});

export const {
  useGetHotelsQuery,
  useGetHotelsByLocationQuery,
  useGetHotelsByRatingQuery,
  useGetRoomsByHotelQuery, 
} = hotelsAPI;
