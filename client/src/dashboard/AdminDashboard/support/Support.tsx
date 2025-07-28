import { useState } from "react";
import { FaReply } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { format } from "date-fns";
import {
  useGetAllTicketsQuery,
  useDeleteTicketMutation,
} from "../../../Features/tickets/ticketAPI";
import type { TSupportTicket } from "../../../Features/tickets/ticketAPI";

const Support: React.FC = () => {
  const { data, isLoading, isError, refetch } = useGetAllTicketsQuery(undefined, {
    refetchOnMountOrArgChange: true,
    pollingInterval: 60000,
  });

  const [deleteTicket] = useDeleteTicketMutation();
  const [, setSelectedTicket] = useState<TSupportTicket | null>(null);

  const tickets: TSupportTicket[] = data?.data ?? [];

  const handleReply = (ticket: TSupportTicket) => {
    setSelectedTicket(ticket);
    alert(`Replying to ticket ID: ${ticket.ticketId}`);
  };

  const handleDelete = async (ticketId: number) => {
    const confirmDelete = window.confirm(`Delete ticket ID ${ticketId}?`);
    if (!confirmDelete) return;

    try {
      await deleteTicket(ticketId).unwrap();
      alert("Ticket deleted.");
      refetch(); // Refresh the ticket list after deletion
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete ticket.");
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {isLoading && <p className="text-center text-blue-600">Loading tickets...</p>}
      {isError && <p className="text-center text-red-600">Error fetching tickets.</p>}

      {tickets.length > 0 ? (
        <div className="overflow-x-auto border-4 border-blue-500 rounded-xl shadow-md">
          <table className="table table-zebra w-full text-sm">
            <thead>
              <tr className="bg-blue-600 text-white text-md text-left">
                <th className="p-4">TicketID</th>
                <th className="p-4">UserID</th>
                <th className="p-4">Subject</th>
                <th className="p-4">Description</th>
                <th className="p-4">Status</th>
                <th className="p-4">CreatedAt</th>
                <th className="p-4">UpdatedAt</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((ticket) => (
                <tr key={ticket.ticketId} className="hover:bg-blue-50">
                  <td className="p-4">{ticket.ticketId}</td>
                  <td className="p-4">{ticket.userId}</td>
                  <td className="p-4">{ticket.subject}</td>
                  <td className="p-4">{ticket.description}</td>
                  <td className="p-4">{ticket.status}</td>
                  <td className="p-4">
                    {ticket.createdAt
                      ? format(new Date(ticket.createdAt), "yyyy-MM-dd")
                      : "—"}
                  </td>
                  <td className="p-4">
                    {ticket.updatedAt
                      ? format(new Date(ticket.updatedAt), "yyyy-MM-dd")
                      : "—"}
                  </td>
                  <td className="p-4 flex gap-2 justify-center">
                    <button
                      onClick={() => handleReply(ticket)}
                      className="btn btn-sm bg-blue-600 hover:bg-green-600 text-white transition"
                    >
                      <FaReply size={16} />
                      <span className="ml-1">Reply</span>
                    </button>
                    <button
                      onClick={() => handleDelete(ticket.ticketId)}
                      className="btn btn-sm bg-red-500 hover:bg-red-600 text-white"
                    >
                      <MdDeleteForever size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        !isLoading && <p className="text-center text-gray-500">No support tickets found.</p>
      )}
    </div>
  );
};

export default Support;
