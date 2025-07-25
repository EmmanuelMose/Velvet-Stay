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
    <div className="mt-2 space-y-2">
      {rooms.map((room) => (
        <div
          key={room.roomId}
          className="border border-blue-300 p-2 rounded bg-blue-50 text-sm"
        >
          <p className="font-semibold">Type: {room.roomType}</p>
          <p>Capacity: {room.capacity}</p>
          <p>Price: ${room.pricePerNight}</p>
          <p>Amenities: {room.amenities}</p>
        </div>
      ))}
    </div>
  );
};

export default AvailableRooms;