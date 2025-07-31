// src/dashboard/AdminDashboard/rooms/Rooms.tsx

import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { roomsApi, type TRoom } from "../../../Features/rooms/roomAPI";
import CreateRoom from "./CreateRoom";
import UpdateRoom from "./UpdateRoom";
import DeleteRoom from "./DeleteRoom";

const Rooms = () => {
  const { data, isLoading, error } = roomsApi.useGetRoomsQuery(undefined, {
    refetchOnMountOrArgChange: true,
    pollingInterval: 60000,
  });

  const [selectedRoom, setSelectedRoom] = useState<TRoom | null>(null);
  const [roomToDelete, setRoomToDelete] = useState<TRoom | null>(null);

  const handleEdit = (room: TRoom) => {
    setSelectedRoom(room);
    (document.getElementById("update_room_modal") as HTMLDialogElement)?.showModal();
  };

  const handleDelete = (room: TRoom) => {
    setRoomToDelete(room);
    (document.getElementById("delete_room_modal") as HTMLDialogElement)?.showModal();
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Create Button */}
      <div className="flex justify-end">
        <button
          className="btn bg-blue-600 text-white hover:bg-blue-700 px-5 py-2 rounded shadow-md"
          onClick={() =>
            (document.getElementById("create_room_modal") as HTMLDialogElement)?.showModal()
          }
        >
          + Create Room
        </button>
      </div>

      {/* Modals */}
      <CreateRoom />
      <UpdateRoom room={selectedRoom} />
      <DeleteRoom room={roomToDelete} />

      {/* Feedback States */}
      {isLoading && (
        <p className="text-center text-blue-600 font-medium">Loading rooms...</p>
      )}
      {error && (
        <p className="text-center text-red-600 font-medium">Error fetching rooms.</p>
      )}

      {/* Room Table */}
      {data?.length ? (
        <div className="overflow-x-auto border-4 border-blue-500 rounded-xl shadow-md">
          <table className="table table-zebra w-full text-sm">
            <thead>
              <tr className="bg-blue-600 text-white text-md text-left">
                <th className="p-4">RoomId</th>
                <th className="p-4">Type</th>
                <th className="p-4">HotelID</th>
                <th className="p-4">Price</th>
                <th className="p-4">Capacity</th>
                <th className="p-4">Amenities</th>
                <th className="p-4">Available</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((room) => (
                <tr key={room.roomId} className="hover:bg-blue-50">
                  <td className="p-4">{room.roomId}</td>
                  <td className="p-4">{room.roomType}</td>
                  <td className="p-4">{room.hotelId}</td>
                  <td className="p-4">
                    {room.pricePerNight != null
                      ? `$${room.pricePerNight.toFixed(2)}`
                      : "N/A"}
                  </td>
                  <td className="p-4">{room.capacity}</td>
                  <td className="p-4">{room.amenities}</td>
                  <td className="p-4">
                    <span
                      className={`badge ${
                        room.isAvailable ? "badge-success" : "badge-error"
                      }`}
                    >
                      {room.isAvailable ? "Yes" : "No"}
                    </span>
                  </td>
                  <td className="p-4 flex gap-2 justify-center">
                    <button
                      className="btn btn-sm bg-blue-500 text-white hover:bg-blue-600"
                      onClick={() => handleEdit(room)}
                    >
                      <FaEdit size={16} />
                    </button>
                    <button
                      className="btn btn-sm bg-red-500 text-white hover:bg-red-600"
                      onClick={() => handleDelete(room)}
                    >
                      <MdDelete size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        !isLoading && (
          <p className="text-center text-gray-500 font-medium">No rooms found.</p>
        )
      )}
    </div>
  );
};

export default Rooms;
