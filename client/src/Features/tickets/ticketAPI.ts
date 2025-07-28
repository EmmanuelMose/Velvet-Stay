import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createApi } from "@reduxjs/toolkit/query/react";
import { ApiDomain } from "../../utils/APIDomain";
import type { RootState } from "../../app/store";

// Ticket status types
export type TTicketStatus = "Open" | "In Progress" | "Resolved";

// Ticket data structure (should match your backend response)
export type TSupportTicket = {
    ticketId: number;
    userId: number;
    subject: string;
    description: string;
    status: TTicketStatus;
    createdAt: string;
    updatedAt?: string;
};

// Payload for creating a ticket
export type TSupportTicketCreate = {
  userId: number;
  subject: string;
  description: string;
};

// Optional fields for updating a ticket
export type TSupportTicketUpdate = Partial<{
  subject: string;
  description: string;
  status: TTicketStatus;
}>;

export const ticketApi = createApi({
  reducerPath: "ticketApi",
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
  tagTypes: ["Tickets"],
  endpoints: (builder) => ({
    // Create a new ticket
    createTicket: builder.mutation<TSupportTicket, TSupportTicketCreate>({
      query: (ticket) => ({
        url: "/ticket",
        method: "POST",
        body: ticket,
      }),
      invalidatesTags: ["Tickets"],
    }),

    // Get all tickets (for Admin)
    getAllTickets: builder.query<{data: TSupportTicket[] }, void>({
      query: () => "/tickets",
      providesTags: ["Tickets"],
    }),

    // Get tickets by user ID
    getUserTickets: builder.query<TSupportTicket[], number>({
      query: (userId) => `/tickets/user/${userId}`,
      providesTags: ["Tickets"],
    }),

    // Get single ticket by ID
    getTicketById: builder.query<TSupportTicket, number>({
      query: (id) => `/ticket/${id}`,
      providesTags: ["Tickets"],
    }),

    // Update a ticket by ID
    updateTicket: builder.mutation<
      { message: string },
      { id: number; data: TSupportTicketUpdate }
    >({
      query: ({ id, data }) => ({
        url: `/ticket/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Tickets"],
    }),

    // Delete a ticket by ID
    deleteTicket: builder.mutation<{ message: string }, number>({
      query: (id) => ({
        url: `/ticket/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Tickets"],
    }),
  }),
});

// Export hooks for components
export const {
  useCreateTicketMutation,
  useGetAllTicketsQuery,
  useGetUserTicketsQuery,
  useGetTicketByIdQuery,
  useUpdateTicketMutation,
  useDeleteTicketMutation,
} = ticketApi;
