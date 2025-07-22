// src/dashboard/AdminDashboard/bookings/Bookings.tsx
import { useState } from "react";
import { bookingApi } from "../../../Features/bookings/bookingAPI";
import CreateBooking from "./CreateBooking";
import UpdateBooking from "./UpdateBooking";
import DeleteBooking from "./DeleteBooking";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const Bookings = () => {
  const { data, isLoading, error } = bookingApi.useGetAllBookingsQuery();
  const [selectedBooking, setSelectedBooking] = useState<any | null>(null);
  const [bookingToDelete, setBookingToDelete] = useState<any | null>(null);

  const handleEdit = (booking: any) => {
    setSelectedBooking(booking);
    (document.getElementById("update_booking_modal") as HTMLDialogElement)?.showModal();
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-center mb-6">
        <button
          className="btn bg-blue-600 text-white hover:bg-blue-700 px-5 py-2 rounded shadow-md"
          onClick={() =>
            (document.getElementById("create_booking_modal") as HTMLDialogElement)?.showModal()
          }
        >
          Create Booking
        </button>
      </div>

      <CreateBooking />
      <UpdateBooking booking={selectedBooking} />
      <DeleteBooking booking={bookingToDelete} />

      {isLoading && <p className="text-center text-blue-600">Loading bookings...</p>}
      {error && <p className="text-center text-red-600">Error fetching bookings.</p>}

      {data?.length ? (
        <div className="overflow-x-auto border-4 border-blue-500 rounded-xl shadow-md">
          <table className="table table-zebra w-full text-sm">
            <thead>
              <tr className="bg-blue-600 text-white text-md">
                <th className="px-4 py-2 border-r border-blue-400">User ID</th>
                <th className="px-4 py-2 border-r border-blue-400">Room ID</th>
                <th className="px-4 py-2 border-r border-blue-400">Check-In</th>
                <th className="px-4 py-2 border-r border-blue-400">Check-Out</th>
                <th className="px-4 py-2 border-r border-blue-400">Amount</th>
                <th className="px-4 py-2 border-r border-blue-400">Status</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((booking: any) => (
                <tr key={booking.BookingId} className="hover">
                  <td className="px-4 py-2 border-r border-blue-100">{booking.UserId}</td>
                  <td className="px-4 py-2 border-r border-blue-100">{booking.RoomId}</td>
                  <td className="px-4 py-2 border-r border-blue-100">{booking.CheckInDate?.slice(0, 10)}</td>
                  <td className="px-4 py-2 border-r border-blue-100">{booking.CheckOutDate?.slice(0, 10)}</td>
                  <td className="px-4 py-2 border-r border-blue-100">${booking.TotalAmount?.toFixed(2)}</td>
                  <td className="px-4 py-2 border-r border-blue-100">{booking.BookingStatus}</td>
                  <td className="px-4 py-2 flex gap-2 justify-center">
                    <button
                      onClick={() => handleEdit(booking)}
                      className="btn btn-sm bg-blue-500 hover:bg-blue-600 text-white"
                    >
                      <FaEdit size={16} />
                    </button>
                    <button
                      onClick={() => {
                        setBookingToDelete(booking);
                        (document.getElementById("delete_booking_modal") as HTMLDialogElement)?.showModal();
                      }}
                      className="btn btn-sm bg-red-500 hover:bg-red-600 text-white"
                    >
                      <MdDelete size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        !isLoading && <p className="text-center text-gray-500">No bookings found.</p>
      )}
    </div>
  );
};

export default Bookings;