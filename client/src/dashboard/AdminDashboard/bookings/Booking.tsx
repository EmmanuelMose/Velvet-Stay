// src/dashboard/AdminDashboard/bookings/Bookings.tsx

import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { bookingApi } from "../../../Features/bookings/bookingAPI";
import CreateBooking from "./CreateBooking";
import UpdateBooking from "./UpdateBooking";
import DeleteBooking from "./DeleteBooking";

const Bookings = () => {
  const {
    data: bookingsData,
    isLoading,
    error,
  } = bookingApi.useGetAllBookingsQuery(undefined, {
    refetchOnMountOrArgChange: true,
    pollingInterval: 60000,
  });

  const [selectedBooking, setSelectedBooking] = useState<any | null>(null);
  const [bookingToDelete, setBookingToDelete] = useState<any | null>(null);

  const handleEdit = (booking: any) => {
    setSelectedBooking(booking);
    (document.getElementById("update_booking_modal") as HTMLDialogElement)?.showModal();
  };

  const handleDelete = (booking: any) => {
    setBookingToDelete(booking);
    (document.getElementById("delete_booking_modal") as HTMLDialogElement)?.showModal();
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Create Button */}
      <div className="flex justify-end">
        <button
          className="btn bg-blue-600 text-white hover:bg-blue-700 px-5 py-2 rounded shadow-md"
          onClick={() =>
            (document.getElementById("create_booking_modal") as HTMLDialogElement)?.showModal()
          }
        >
          + Create Booking
        </button>
      </div>

      {/* Modals */}
      <CreateBooking />
      <UpdateBooking booking={selectedBooking} />
      <DeleteBooking booking={bookingToDelete} />

      {/* Status Feedback */}
      {isLoading && (
        <p className="text-center text-blue-600 font-medium">Loading bookings...</p>
      )}
      {error && (
        <p className="text-center text-red-600 font-medium">Error fetching bookings.</p>
      )}

      {/* Table */}
      {bookingsData?.length ? (
        <div className="overflow-x-auto border-4 border-blue-500 rounded-xl shadow-md">
          <table className="table table-zebra w-full text-sm">
            <thead>
              <tr className="bg-blue-600 text-white text-md text-left">
                <th className="p-4">BookingID</th>
                <th className="p-4">UserID</th>
                <th className="p-4">RoomID</th>
                <th className="p-4">CheckIn</th>
                <th className="p-4">CheckOut</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Status</th>
                <th className="p-4">Created At</th>
                <th className="p-4">Updated At</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookingsData.map((booking: any) => (
                <tr key={booking.bookingId} className="hover:bg-blue-50">
                  <td className="p-4">{booking.bookingId}</td>
                  <td className="p-4">{booking.userId}</td>
                  <td className="p-4">{booking.roomId}</td>
                  <td className="p-4">
                    {booking.checkInDate
                      ? new Date(booking.checkInDate).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td className="p-4">
                    {booking.checkOutDate
                      ? new Date(booking.checkOutDate).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td className="p-4">
                    {booking.totalAmount != null
                      ? `Ksh ${booking.totalAmount.toFixed(2)}`
                      : "N/A"}
                  </td>
                  <td className="p-4">{booking.bookingStatus}</td>
                  <td className="p-4">
                    {booking.createdAt
                      ? new Date(booking.createdAt).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td className="p-4">
                    {booking.updatedAt
                      ? new Date(booking.updatedAt).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td className="p-4 flex gap-2 justify-center">
                    <button
                      onClick={() => handleEdit(booking)}
                      className="btn btn-sm bg-blue-500 hover:bg-blue-600 text-white"
                    >
                      <FaEdit size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(booking)}
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
        !isLoading && (
          <p className="text-center text-gray-500 font-medium">No bookings found.</p>
        )
      )}
    </div>
  );
};

export default Bookings;
