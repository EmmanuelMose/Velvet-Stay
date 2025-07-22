// src/dashboard/AdminDashboard/rooms/UpdateRoom.tsx
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { roomsApi, type TRoom } from "../../../Features/rooms/roomAPI";

type Props = {
  room: TRoom | null;
};

const UpdateRoom = ({ room }: Props) => {
  const [updateRoom, { isLoading }] = roomsApi.useUpdateRoomMutation({
    fixedCacheKey: "updateRoom",
  });

  const [formData, setFormData] = useState({
    hotelId: "",
    roomType: "",
    capacity: "",
    pricePerNight: "",
    amenities: "",
    isAvailable: true,
  });

  useEffect(() => {
    if (room) {
      setFormData({
        hotelId: room.hotelId.toString(),
        roomType: room.roomType,
        capacity: room.capacity.toString(),
        pricePerNight: room.pricePerNight.toString(),
        amenities: room.amenities,
        isAvailable: room.isAvailable,
      });
    }
  }, [room]);

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

  const handleUpdate = async () => {
    if (!room) return;

    try {
      await updateRoom({
        roomId: room.roomId,
        roomData: {
          hotelId: parseInt(formData.hotelId),
          roomType: formData.roomType,
          capacity: parseInt(formData.capacity),
          pricePerNight: parseFloat(formData.pricePerNight),
          amenities: formData.amenities,
          isAvailable: formData.isAvailable,
        },
      }).unwrap();

      toast.success("Room updated successfully!");
      (document.getElementById("update_room_modal") as HTMLDialogElement)?.close();
    } catch (error) {
      console.error("Error updating room:", error);
      toast.error("Failed to update room.");
    }
  };

  return (
    <dialog id="update_room_modal" className="modal">
      <div className="modal-box bg-gradient-to-b from-blue-800 via-blue-600 to-green-500 text-white max-w-md w-full rounded-xl shadow-xl p-8">
        <h3 className="text-2xl font-bold text-center mb-6">Update Room</h3>
        <form className="flex flex-col space-y-4">
          <input name="hotelId" type="number" placeholder="Hotel ID" className="input input-bordered bg-white text-gray-800" value={formData.hotelId} onChange={handleChange} />
          <input name="roomType" type="text" placeholder="Room Type" className="input input-bordered bg-white text-gray-800" value={formData.roomType} onChange={handleChange} />
          <input name="capacity" type="number" placeholder="Capacity" className="input input-bordered bg-white text-gray-800" value={formData.capacity} onChange={handleChange} />
          <input name="pricePerNight" type="number" step="0.01" placeholder="Price Per Night" className="input input-bordered bg-white text-gray-800" value={formData.pricePerNight} onChange={handleChange} />
          <textarea name="amenities" placeholder="Amenities" className="textarea textarea-bordered bg-white text-gray-800" value={formData.amenities} onChange={handleChange} />
          <label className="label cursor-pointer">
            <span className="label-text text-white">Available</span>
            <input type="checkbox" name="isAvailable" className="checkbox checkbox-accent" checked={formData.isAvailable} onChange={handleChange} />
          </label>
          <div className="modal-action mt-6 flex justify-end gap-4">
            <button type="button" className="btn bg-green-800 text-white hover:bg-blue-800" onClick={() => (document.getElementById("update_room_modal") as HTMLDialogElement)?.close()}>
              Cancel
            </button>
            <button type="button" className="btn bg-green-800 text-white hover:bg-blue-800" onClick={handleUpdate} disabled={isLoading}>
              {isLoading ? <><span className="loading loading-spinner" /> Updating...</> : "Save"}
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default UpdateRoom;
