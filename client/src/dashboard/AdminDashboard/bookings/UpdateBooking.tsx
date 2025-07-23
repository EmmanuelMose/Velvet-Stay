// src/dashboard/AdminDashboard/bookings/UpdateBooking.tsx

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { bookingApi } from "../../../Features/bookings/bookingAPI";

interface Props {
  booking: {
    bookingId: number;
    bookingStatus: "Pending" | "Confirmed" | "Cancelled";
  } | null;
}

const UpdateBooking = ({ booking }: Props) => {
  const [updateBooking, { isLoading }] = bookingApi.useUpdateBookingMutation({
    fixedCacheKey: "updateBooking",
  });

  const [bookingStatus, setBookingStatus] = useState<"Pending" | "Confirmed" | "Cancelled">("Pending");

  useEffect(() => {
    if (booking) {
      setBookingStatus(booking.bookingStatus);
    }
  }, [booking]);

  const handleUpdate = async () => {
    if (!booking) return;

    try {
      await updateBooking({
        bookingId: booking.bookingId,
        updatedData: {
          bookingStatus: bookingStatus,
        },
      }).unwrap();

      toast.success("Booking status updated successfully!");
      (document.getElementById("update_booking_modal") as HTMLDialogElement)?.close();
    } catch (error) {
      console.error("Error updating booking status:", error);
      toast.error("Failed to update booking status.");
    }
  };

  return (
    <dialog id="update_booking_modal" className="modal">
      <div className="modal-box bg-gradient-to-b from-blue-800 via-blue-600 to-green-500 text-white max-w-md w-full rounded-xl shadow-xl p-8">
        <h3 className="text-2xl font-bold text-center mb-6">Update Booking Status</h3>

        <form className="flex flex-col space-y-4">
          <select
            value={bookingStatus}
            onChange={(e) => setBookingStatus(e.target.value as "Pending" | "Confirmed" | "Cancelled")}
            className="select select-bordered bg-white text-gray-800"
          >
            <option value="Pending">Pending</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Cancelled">Cancelled</option>
          </select>

          <div className="modal-action mt-6 flex justify-end gap-4">
            <button
              type="button"
              className="btn bg-green-800 text-white hover:bg-blue-800"
              onClick={() =>
                (document.getElementById("update_booking_modal") as HTMLDialogElement)?.close()
              }
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn bg-green-800 text-white hover:bg-blue-800"
              onClick={handleUpdate}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="loading loading-spinner"></span> Updating...
                </>
              ) : (
                "Save"
              )}
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default UpdateBooking;
