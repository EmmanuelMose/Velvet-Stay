// src/dashboard/AdminDashboard/rooms/CreateRoom.tsx

import { useState, type FormEvent } from "react";
import { roomsApi } from "../../../Features/rooms/roomAPI";

const CreateRoom = () => {
  const [createRoom, { isLoading }] = roomsApi.useCreateRoomMutation();
  const [formData, setFormData] = useState({
    hotelId: "",
    roomType: "",
    capacity: "",
    pricePerNight: "",
    amenities: "",
    isAvailable: true,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const payload = {
      hotelId: parseInt(formData.hotelId),
      roomType: formData.roomType,
      capacity: parseInt(formData.capacity),
      pricePerNight: parseFloat(formData.pricePerNight),
      amenities: formData.amenities,
      isAvailable: formData.isAvailable,
    };

    try {
      await createRoom(payload).unwrap();
      (document.getElementById("create_room_modal") as HTMLDialogElement)?.close();
      setFormData({
        hotelId: "",
        roomType: "",
        capacity: "",
        pricePerNight: "",
        amenities: "",
        isAvailable: true,
      });
    } catch (err) {
      console.error("Room creation failed", err);
    }
  };

  return (
    <dialog id="create_room_modal" className="modal">
      <div className="modal-box bg-gradient-to-b from-blue-800 via-blue-600 to-green-500 text-white max-w-md w-full rounded-xl shadow-xl p-8">
        <h3 className="text-2xl font-bold text-center mb-6">Create New Room</h3>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input
            type="number"
            name="hotelId"
            placeholder="Hotel ID"
            className="input input-bordered bg-white text-gray-800"
            value={formData.hotelId}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="roomType"
            placeholder="Room Type"
            className="input input-bordered bg-white text-gray-800"
            value={formData.roomType}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="capacity"
            placeholder="Capacity"
            className="input input-bordered bg-white text-gray-800"
            value={formData.capacity}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            step="0.01"
            name="pricePerNight"
            placeholder="Price Per Night"
            className="input input-bordered bg-white text-gray-800"
            value={formData.pricePerNight}
            onChange={handleChange}
            required
          />
          <textarea
            name="amenities"
            placeholder="Amenities"
            className="textarea textarea-bordered bg-white text-gray-800 min-h-[100px]"
            value={formData.amenities}
            onChange={handleChange}
            required
          />

          <div className="form-control">
            <label className="label cursor-pointer text-white">
              <span className="label-text text-white">Available?</span>
              <input
                type="checkbox"
                name="isAvailable"
                checked={formData.isAvailable}
                onChange={handleChange}
                className="checkbox checkbox-success"
              />
            </label>
          </div>

          <div className="modal-action mt-6 flex justify-end gap-4">
            <button
              type="button"
              onClick={() => (document.getElementById("create_room_modal") as HTMLDialogElement)?.close()}
              className="btn bg-green-800 text-white hover:bg-blue-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn bg-green-800 text-white hover:bg-blue-800"
            >
              {isLoading ? "Creating..." : "Create"}
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default CreateRoom;
