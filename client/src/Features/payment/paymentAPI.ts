// paymentAPI.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiDomain } from "../../utils/APIDomain";
import type { RootState } from "../../app/store";

export type TPayment = {
  paymentId: number;
  bookingId: number;
  amount: number;
  paymentStatus: "Pending" | "Completed" | "Failed";
  paymentDate: string;
  paymentMethod: string;
  transactionId: string;
  createdAt: string;
  updatedAt: string;
};

export const paymentApi = createApi({
  reducerPath: "paymentApi",
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
  endpoints: (builder) => ({
    getAllPayments: builder.query<TPayment[], void>({
      query: () => "/payments",
    }),
    getPaymentById: builder.query<TPayment, number>({
      query: (id) => `/payment/${id}`,
    }),
    getPaymentsByDate: builder.query<TPayment[], string>({
      query: (date) => `/payments/date/${date}`,
    }),
  }),
});

export const {
  useGetAllPaymentsQuery,
  useGetPaymentByIdQuery,
  useGetPaymentsByDateQuery,
} = paymentApi;
