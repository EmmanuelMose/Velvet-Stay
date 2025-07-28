import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import html2pdf from "html2pdf.js";
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
  hotelName?: string;
  hotelLocation?: string;
};

const BookingHistory: React.FC = () => {
  const { data: bookingsData, isLoading, error } = useGetAllBookingsQuery();
  const [updateBookingStatus] = useUpdateBookingStatusMutation();
  const [localBookings, setLocalBookings] = useState<Booking[] | undefined>(bookingsData);

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
      await updateBookingStatus({ bookingId, status: "Confirmed" }).unwrap();

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

  const handleDownloadReceipt = (booking: Booking) => {
    const element = document.createElement("div");
    element.innerHTML = `
      <div style="font-family: Arial; padding: 20px; max-width: 300px; font-size: 11px; line-height: 1.4;">
        <h2 style="text-align: center; color: #333;">Booking Receipt</h2>
        <hr />
        <p><strong>Booking ID:</strong> ${booking.bookingId}</p>
        <p><strong>User ID:</strong> ${booking.userId}</p>
        <p><strong>Hotel:</strong> ${booking.hotelName ?? "N/A"}</p>
        <p><strong>Location:</strong> ${booking.hotelLocation ?? "N/A"}</p>
        <p><strong>Room ID:</strong> ${booking.roomId}</p>
        <p><strong>Check-In:</strong> ${new Date(booking.checkInDate).toLocaleDateString()}</p>
        <p><strong>Check-Out:</strong> ${new Date(booking.checkOutDate).toLocaleDateString()}</p>
        <p><strong>Total:</strong> $${booking.totalAmount.toFixed(2)}</p>
        <p><strong>Status:</strong> ${booking.bookingStatus}</p>
        <p><strong>Created:</strong> ${new Date(booking.createdAt).toLocaleString()}</p>
        <hr />
        <p style="text-align: center;">Thank you for booking with us!</p>
      </div>
    `;

    html2pdf()
      .set({
        margin: 5,
        filename: `Booking_Receipt_${booking.bookingId}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "mm", format: "a6", orientation: "portrait" },
      })
      .from(element)
      .save();
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <Toaster position="top-center" reverseOrder={false} />
      <h2 className="text-2xl font-bold text-gray-800">Booking History</h2>

      {isLoading && <p className="text-center text-blue-600 font-medium">Loading bookings...</p>}
      {error && <p className="text-center text-red-600 font-medium">Error fetching bookings.</p>}
      {!isLoading && localBookings?.length === 0 && (
        <p className="text-center text-gray-500 font-medium">No bookings found.</p>
      )}

      {localBookings?.length ? (
        <div className="max-h-[500px] overflow-y-auto border-4 border-blue-500 rounded-xl shadow-md">
          <table className="table table-zebra w-full text-sm">
            <thead>
              <tr className="bg-blue-600 text-white text-md text-left">
                <th className="p-4">Hotel</th>
                <th className="p-4">Location</th>
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
                  <td className="p-4">{booking.hotelName ?? "N/A"}</td>
                  <td className="p-4">{booking.hotelLocation ?? "N/A"}</td>
                  <td className="p-4">{booking.bookingId}</td>
                  <td className="p-4">{booking.userId}</td>
                  <td className="p-4">{booking.roomId}</td>
                  <td className="p-4">{new Date(booking.checkInDate).toLocaleDateString()}</td>
                  <td className="p-4">{new Date(booking.checkOutDate).toLocaleDateString()}</td>
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
                  <td className="p-4">{new Date(booking.createdAt).toLocaleString()}</td>
                  <td className="p-4">
                    <div className="flex flex-col sm:flex-row gap-2">
                      <button
                        className="btn btn-sm bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded"
                        onClick={() => handleBookRoom(booking.bookingId)}
                      >
                        Book Room
                      </button>
                      <button
                        className="btn btn-sm bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
                        onClick={() => handleDownloadReceipt(booking)}
                      >
                        Download Receipt
                      </button>
                    </div>
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
