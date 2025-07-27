import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import {
  useGetAllBookingsQuery,
  useUpdateBookingStatusMutation,
} from "../../../Features/bookings/bookingAPI";

type BookingStatus = "Pending" | "Confirmed" | "Cancelled";

type Booking = {
  bookingId: number;
  userId: number;
  roomId: number;
  checkInDate: string;
  checkOutDate: string;
  totalAmount: number;
  bookingStatus: BookingStatus;
  createdAt: string;
};

const BookingHistory: React.FC = () => {
  const { data: bookingsData, isLoading, error } = useGetAllBookingsQuery();
  const [updateBookingStatus] = useUpdateBookingStatusMutation();

  const [localBookings, setLocalBookings] = useState<Booking[] | undefined>(bookingsData);

  // Sync local state with fetched data
  useEffect(() => {
    setLocalBookings(bookingsData);
  }, [bookingsData]);

  const handleBookRoom = async (bookingId: number) => {
    const booking = localBookings?.find((b) => b.bookingId === bookingId);
    if (!booking) return;

    if (booking.bookingStatus === "Confirmed") {
      toast.error("Room already booked!");
      return;
    }

    try {
      // Backend call
      await updateBookingStatus({
        bookingId,
        status: "Confirmed",
      }).unwrap();

      // Local update
      setLocalBookings((prev) =>
        prev?.map((b) =>
          b.bookingId === bookingId ? { ...b, bookingStatus: "Confirmed" } : b
        )
      );

      toast.success("Booking confirmed!");
    } catch (err) {
      toast.error("Failed to confirm booking.");
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <Toaster position="top-center" reverseOrder={false} />
      <h2 className="text-2xl font-bold text-gray-800">Booking History</h2>

      {/* Status Messages */}
      {isLoading && <p className="text-center text-blue-600 font-medium">Loading bookings...</p>}
      {error && <p className="text-center text-red-600 font-medium">Error fetching bookings.</p>}
      {!isLoading && localBookings?.length === 0 && (
        <p className="text-center text-gray-500 font-medium">No bookings found.</p>
      )}

      {/* Scrollable Table */}
      {localBookings?.length ? (
        <div className="max-h-[500px] overflow-y-auto border-4 border-blue-500 rounded-xl shadow-md">
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
                <th className="p-4">CreatedAt</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {localBookings.map((booking) => (
                <tr key={booking.bookingId} className="hover:bg-blue-50">
                  <td className="p-4">{booking.bookingId}</td>
                  <td className="p-4">{booking.userId}</td>
                  <td className="p-4">{booking.roomId}</td>
                  <td className="p-4">
                    {new Date(booking.checkInDate).toLocaleDateString()}
                  </td>
                  <td className="p-4">
                    {new Date(booking.checkOutDate).toLocaleDateString()}
                  </td>
                  <td className="p-4">${booking.totalAmount.toFixed(2)}</td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-1 rounded text-white ${
                        booking.bookingStatus === "Confirmed"
                          ? "bg-green-500"
                          : booking.bookingStatus === "Cancelled"
                          ? "bg-red-500"
                          : "bg-yellow-500"
                      }`}
                    >
                      {booking.bookingStatus}
                    </span>
                  </td>
                  <td className="p-4">
                    {new Date(booking.createdAt).toLocaleString()}
                  </td>
                  <td className="p-4 flex justify-center">
                    <button
                      className="btn btn-sm bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-1 rounded"
                      onClick={() => handleBookRoom(booking.bookingId)}
                    >
                      Book Room
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </div>
  );
};

export default BookingHistory;
