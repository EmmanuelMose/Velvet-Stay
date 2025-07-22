// src/dashboard/AdminDashboard/hotels/UpdateHotel.tsx

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { hotelApi, type THotel } from "../../../Features/hotels/hotelAPI";

type UpdateHotelProps = {
  hotel: THotel | null;
};

const UpdateHotel = ({ hotel }: UpdateHotelProps) => {
  const [updateHotel, { isLoading }] = hotelApi.useUpdateHotelMutation({
    fixedCacheKey: "updateHotel",
  });

  const [formData, setFormData] = useState({
    name: "",
    location: "",
    address: "",
    contactPhone: "",
    category: "",
    imgUrl: "",
    rating: "",
    description: "",
  });

  useEffect(() => {
    if (hotel) {
      setFormData({
        name: hotel.name,
        location: hotel.location,
        address: hotel.address,
        contactPhone: hotel.contactPhone,
        category: hotel.category,
        imgUrl: hotel.imgUrl,
        rating: hotel.rating?.toString() ?? "",
        description: hotel.description,
      });
    }
  }, [hotel]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    if (!hotel) {
      toast.error("No hotel selected for update.");
      return;
    }

    try {
      await updateHotel({
        hotelId: hotel.hotelId,
        data: {
          ...formData,
          rating: parseFloat(formData.rating),
        },
      }).unwrap();

      toast.success("Hotel updated successfully!");
      (document.getElementById("update_hotel_modal") as HTMLDialogElement)?.close();
    } catch (error) {
      console.error("Error updating hotel:", error);
      toast.error("Failed to update hotel. Please try again.");
    }
  };

  return (
    <dialog id="update_hotel_modal" className="modal">
      <div className="modal-box bg-gradient-to-b from-blue-800 via-blue-600 to-green-500 text-white max-w-md w-full rounded-xl shadow-xl p-8">
        <h3 className="text-2xl font-bold text-center mb-6">Update Hotel</h3>

        <form className="flex flex-col space-y-4">
          <input
            name="name"
            type="text"
            placeholder="Hotel Name"
            className="input input-bordered bg-white text-gray-800"
            value={formData.name}
            onChange={handleChange}
          />
          <input
            name="location"
            type="text"
            placeholder="Location"
            className="input input-bordered bg-white text-gray-800"
            value={formData.location}
            onChange={handleChange}
          />
          <input
            name="address"
            type="text"
            placeholder="Address"
            className="input input-bordered bg-white text-gray-800"
            value={formData.address}
            onChange={handleChange}
          />
          <input
            name="contactPhone"
            type="text"
            placeholder="Contact Phone"
            className="input input-bordered bg-white text-gray-800"
            value={formData.contactPhone}
            onChange={handleChange}
          />
          <input
            name="category"
            type="text"
            placeholder="Category"
            className="input input-bordered bg-white text-gray-800"
            value={formData.category}
            onChange={handleChange}
          />
          <input
            name="imgUrl"
            type="url"
            placeholder="Image URL"
            className="input input-bordered bg-white text-gray-800"
            value={formData.imgUrl}
            onChange={handleChange}
          />

          {formData.imgUrl && (
            <img
              src={formData.imgUrl}
              alt="Preview"
              className="h-40 w-full object-cover rounded border border-white"
            />
          )}

          <input
            name="rating"
            type="number"
            step="0.1"
            min="0"
            max="5"
            placeholder="Rating"
            className="input input-bordered bg-white text-gray-800"
            value={formData.rating}
            onChange={handleChange}
          />
          <textarea
            name="description"
            placeholder="Description"
            className="textarea textarea-bordered bg-white text-gray-800 min-h-[120px]"
            value={formData.description}
            onChange={handleChange}
          />

          <div className="modal-action mt-6 flex justify-end gap-4">
            <button
              type="button"
              className="btn bg-green-800 text-white hover:bg-blue-800"
              onClick={() =>
                (document.getElementById("update_hotel_modal") as HTMLDialogElement)?.close()
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

export default UpdateHotel;