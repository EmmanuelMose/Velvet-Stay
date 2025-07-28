// src/dashboard/UserDashboard/ViewHotels/AvailableRooms.tsx

import React from "react";
import { useGetRoomsByHotelQuery } from "../../../Features/hotels/HotelsAPI";

type Props = {
  hotelId: number;
};

const AvailableRooms: React.FC<Props> = ({ hotelId }) => {
  const { data: rooms, isLoading, error } = useGetRoomsByHotelQuery(hotelId);

  if (isLoading) return <p className="text-sm text-gray-600 mt-2">Loading rooms...</p>;
  if (error) return <p className="text-sm text-red-500 mt-2">Failed to load rooms.</p>;

  if (!rooms?.length) {
    return <p className="text-sm text-gray-500 mt-2">No rooms found for this hotel.</p>;
  }

  const handleBookRoom = (roomId: number) => {
    alert(`Booking room with ID: ${roomId}`);
    // You can replace this with a navigation or modal in the future
  };

  return (
    <div className="mt-3 space-y-4 border-t border-gray-200 pt-3">
      {rooms.map((room) => (
        <div
          key={room.roomId}
          className="border border-blue-200 p-4 rounded-md bg-white shadow hover:shadow-lg transition-all duration-300"
        >
          <p className="text-blue-800 font-semibold text-base mb-1">Room Type: {room.roomType}</p>
          <p className="text-sm">Capacity: {room.capacity} guests</p>
          <p className="text-sm">Price Per Night: ${room.pricePerNight}</p>
          <p className="text-sm">Amenities: {room.amenities}</p>
           <p className="text-sm">
            Status:{" "}
            <span
              className={
                room.isAvailable
                  ? "text-green-600 font-semibold"
                  : "text-red-600 font-semibold"
              }
            >
              {room.isAvailable ? "Available" : "Not Available"}
            </span>
           </p>

          {room.isAvailable && (
            <button
              onClick={() => handleBookRoom(room.roomId)}
              className="mt-3 bg-blue-600 hover:bg-green-500 text-white text-sm px-4 py-2 rounded transition duration-200"
            >
              Book Room
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default AvailableRooms;
