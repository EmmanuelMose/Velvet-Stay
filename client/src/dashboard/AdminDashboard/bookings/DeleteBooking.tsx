// src/dashboard/AdminDashboard/bookings/DeleteBooking.tsx

import { toast } from "sonner";
import { bookingApi } from "../../../Features/bookings/bookingAPI";

interface Props {
  booking: {
    bookingId: number;
  } | null;
}

const DeleteBooking = ({ booking }: Props) => {
  const [deleteBooking, { isLoading }] = bookingApi.useDeleteBookingMutation({
    fixedCacheKey: "deleteBooking",
  });

  const handleDelete = async () => {
    if (!booking) return;

    try {
      await deleteBooking(booking.bookingId).unwrap();
      toast.success("Booking deleted successfully!");
      (document.getElementById("delete_booking_modal") as HTMLDialogElement)?.close();
    } catch (error) {
      console.error("Error deleting booking:", error);
      toast.error("Failed to delete booking.");
    }
  };

  return (
    <dialog id="delete_booking_modal" className="modal">
      <div className="modal-box bg-red-600 text-white max-w-md w-full rounded-xl shadow-xl p-8">
        <h3 className="text-2xl font-bold text-center mb-6">Delete Booking</h3>
        <p className="text-center mb-6">Are you sure you want to delete this booking?</p>
        <div className="modal-action flex justify-end gap-4">
          <button
            type="button"
            className="btn bg-green-800 text-white hover:bg-blue-800"
            onClick={() => (document.getElementById("delete_booking_modal") as HTMLDialogElement)?.close()}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn bg-red-800 text-white hover:bg-red-900"
            onClick={handleDelete}
            disabled={isLoading}
          >
            {isLoading ? <><span className="loading loading-spinner" /> Deleting...</> : "Delete"}
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default DeleteBooking;
