// src/dashboard/AdminDashboard/bookings/CreateBooking.tsx

import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { bookingApi } from "../../../Features/bookings/bookingAPI";

const CreateBooking = () => {
  const [createBooking, { isLoading }] = bookingApi.useCreateBookingMutation();

  const [formData, setFormData] = useState({
    userId: "",
    roomId: "",
    checkInDate: "",
    checkOutDate: "",
    totalAmount: "",
    bookingStatus: "Pending",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

  
    const payload = {
      UserId: parseInt(formData.userId),
      RoomId: parseInt(formData.roomId),
      CheckInDate: formData.checkInDate,
      CheckOutDate: formData.checkOutDate,
      TotalAmount: parseFloat(formData.totalAmount),
      BookingStatus: formData.bookingStatus as
        | "Pending"
        | "Confirmed"
        | "Cancelled",
    };

    try {
      await createBooking(payload).unwrap();
      toast.success("Booking created successfully!");
      (document.getElementById("create_booking_modal") as HTMLDialogElement)?.close();
      setFormData({
        userId: "",
        roomId: "",
        checkInDate: "",
        checkOutDate: "",
        totalAmount: "",
        bookingStatus: "Pending",
      });
    } catch (error) {
      console.error("Error creating booking:", error);
      toast.error("Failed to create booking.");
    }
  };

  return (
    <dialog id="create_booking_modal" className="modal">
      <div className="modal-box bg-gradient-to-b from-blue-800 via-blue-600 to-green-500 text-white max-w-md w-full rounded-xl shadow-xl p-8">
        <h3 className="text-2xl font-bold text-center mb-6">Create New Booking</h3>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input
            type="number"
            name="userId"
            placeholder="User ID"
            className="input input-bordered bg-white text-gray-800"
            value={formData.userId}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="roomId"
            placeholder="Room ID"
            className="input input-bordered bg-white text-gray-800"
            value={formData.roomId}
            onChange={handleChange}
            required
          />
          <input
            type="datetime-local"
            name="checkInDate"
            className="input input-bordered bg-white text-gray-800"
            value={formData.checkInDate}
            onChange={handleChange}
            required
          />
          <input
            type="datetime-local"
            name="checkOutDate"
            className="input input-bordered bg-white text-gray-800"
            value={formData.checkOutDate}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="totalAmount"
            placeholder="Total Amount"
            step="0.01"
            className="input input-bordered bg-white text-gray-800"
            value={formData.totalAmount}
            onChange={handleChange}
            required
          />
          <select
            name="bookingStatus"
            className="select select-bordered bg-white text-gray-800"
            value={formData.bookingStatus}
            onChange={handleChange}
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
                (document.getElementById("create_booking_modal") as HTMLDialogElement)?.close()
              }
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn bg-green-800 text-white hover:bg-blue-800"
              disabled={isLoading}
            >
              {isLoading ? "Creating..." : "Create"}
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default CreateBooking;
