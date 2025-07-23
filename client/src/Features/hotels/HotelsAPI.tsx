//This is for users dashboard.
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

export const hotelsAPI = createApi({
  reducerPath: "hotelsAPI",
  baseQuery: fetchBaseQuery({ baseUrl: ApiDomain }),
  endpoints: (builder) => ({
    getHotels: builder.query<THotel[], void>({
      query: () => `/hotels`,
    }),
    getHotelsByLocation: builder.query<THotel[], string>({
      query: (location) => `/hotels/${location}`,
    }),
    getHotelsByRating: builder.query<THotel[], string>({
      query: (rating) => `/hotels/rating/${rating}`,
    }),
  }),
});

export const {
  useGetHotelsQuery,                 
  useGetHotelsByLocationQuery,      
  useGetHotelsByRatingQuery,        
} = hotelsAPI;
