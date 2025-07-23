// src/dashboard/AdminDashboard/hotels/Hotels.tsx

import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { hotelApi, type THotel } from "../../../Features/hotels/hotelAPI";
import CreateHotel from "./CreateHotel";
import UpdateHotel from "./UpdateHotel";
import DeleteHotel from "./DeleteHotel";

const Hotels = () => {
  const {
    data: hotelsData,
    isLoading,
    error,
  } = hotelApi.useGetHotelsQuery(undefined, {
    refetchOnMountOrArgChange: true,
    pollingInterval: 60000,
  });

  const [selectedHotel, setSelectedHotel] = useState<THotel | null>(null);
  const [hotelToDelete, setHotelToDelete] = useState<THotel | null>(null);

  const handleEdit = (hotel: THotel) => {
    setSelectedHotel(hotel);
    (document.getElementById("update_hotel_modal") as HTMLDialogElement)?.showModal();
  };

  const handleDelete = (hotel: THotel) => {
    setHotelToDelete(hotel);
    (document.getElementById("delete_hotel_modal") as HTMLDialogElement)?.showModal();
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Create Button */}
      <div className="flex justify-end">
        <button
          className="btn bg-blue-600 text-white hover:bg-blue-700 px-5 py-2 rounded shadow-md"
          onClick={() =>
            (document.getElementById("create_hotel_modal") as HTMLDialogElement)?.showModal()
          }
        >
          + Create Hotel
        </button>
      </div>

      {/* Modals */}
      <CreateHotel />
      <UpdateHotel hotel={selectedHotel} />
      <DeleteHotel hotel={hotelToDelete} />

      {/* Status Feedback */}
      {isLoading && (
        <p className="text-center text-blue-600 font-medium">Loading hotels...</p>
      )}
      {error && (
        <p className="text-center text-red-600 font-medium">Error fetching hotels.</p>
      )}

      {/* Table */}
      {hotelsData?.length ? (
        <div className="overflow-x-auto border-4 border-blue-500 rounded-xl shadow-md">
          <table className="table table-zebra w-full text-sm">
            <thead>
              <tr className="bg-blue-600 text-white text-md text-left">
                <th className="p-4">HotelId</th>
                <th className="p-4">Name</th>
                <th className="p-4">Location</th>
                <th className="p-4">Address</th>
                <th className="p-4">Contact Phone</th>
                <th className="p-4">Category</th>
                <th className="p-4">Image</th>
                <th className="p-4">Rating</th>
                <th className="p-4">Created At</th>
                <th className="p-4">Updated At</th>
                <th className="p-4">Description</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {hotelsData.map((hotel) => (
                <tr key={hotel.hotelId} className="hover:bg-blue-50">
                  <td className="p-4">{hotel.hotelId}</td>
                  <td className="p-4">{hotel.name}</td>
                  <td className="p-4">{hotel.location}</td>
                  <td className="p-4">{hotel.address}</td>
                  <td className="p-4">{hotel.contactPhone}</td>
                  <td className="p-4">{hotel.category}</td>
                  <td className="p-4">
                    <img
                      src={hotel.imgUrl}
                      alt={hotel.name}
                      className="w-20 h-14 object-cover rounded border border-white"
                    />
                  </td>
                  <td className="p-4">
                    {hotel.rating !== null ? hotel.rating.toFixed(1) : "N/A"}
                  </td>
                  <td className="p-4">
                    {hotel.createdAt
                      ? new Date(hotel.createdAt).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td className="p-4">
                    {hotel.updatedAt
                      ? new Date(hotel.updatedAt).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td className="p-4">{hotel.description}</td>
                  <td className="p-4 flex gap-2 justify-center">
                    <button
                      onClick={() => handleEdit(hotel)}
                      className="btn btn-sm bg-blue-500 hover:bg-blue-600 text-white"
                    >
                      <FaEdit size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(hotel)}
                      className="btn btn-sm bg-red-500 hover:bg-red-600 text-white"
                    >
                      <MdDeleteForever size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        !isLoading && (
          <p className="text-center text-gray-500 font-medium">No hotels found.</p>
        )
      )}
    </div>
  );
};

export default Hotels;
