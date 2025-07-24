import React from "react";
import { useGetAvailableRoomsByHotelQuery } from "../../../Features/rooms/roomsAPI";

type Props = {
  hotelId: number;
};

const AvailableRooms: React.FC<Props> = ({ hotelId }) => {
  const { data: rooms, isLoading, error } = useGetAvailableRoomsByHotelQuery(hotelId);

  if (isLoading) return <p className="text-sm text-gray-600">Loading available rooms...</p>;
  if (error) return <p className="text-sm text-red-500">Failed to load rooms.</p>;
  if (!rooms?.length) return <p className="text-sm text-gray-500">No available rooms in this hotel.</p>;

  return (
    <div className="mt-2 space-y-3">
      {rooms.map((room) => (
        <div
          key={room.roomId}
          className="border border-blue-300 bg-blue-50 p-4 rounded-md shadow-sm flex flex-col sm:flex-row sm:justify-between items-start sm:items-center"
        >
          <div className="text-sm text-gray-700 space-y-1">
            <p className="font-semibold text-blue-800">Type: {room.roomType}</p>
            <p>Capacity: {room.capacity}</p>
            <p>Price: <span className="text-green-700 font-medium">${room.pricePerNight}</span></p>
            <p>Amenities: {room.amenities}</p>
          </div>

          <button
            className="mt-3 sm:mt-0 sm:ml-4 bg-green-500 hover:bg-blue-600 text-white text-sm px-4 py-2 rounded transition"
          >
            Book Room
          </button>
        </div>
      ))}
    </div>
  );
};

export default AvailableRooms;
