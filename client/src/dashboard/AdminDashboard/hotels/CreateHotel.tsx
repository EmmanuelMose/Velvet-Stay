// src/dashboard/AdminDashboard/hotels/CreateHotel.tsx

import { useState, type FormEvent } from "react";
import { hotelApi } from "../../../Features/hotels/hotelAPI";

const CreateHotel = () => {
  const [createHotel, { isLoading }] = hotelApi.useCreateHotelMutation();

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const hotelPayload = {
      ...formData,
      rating: parseFloat(formData.rating),
    };

    try {
      await createHotel(hotelPayload).unwrap();
      (document.getElementById("create_hotel_modal") as HTMLDialogElement)?.close();
      setFormData({
        name: "",
        location: "",
        address: "",
        contactPhone: "",
        category: "",
        imgUrl: "",
        rating: "",
        description: "",
      });
    } catch (error) {
      console.error("Create hotel failed:", error);
    }
  };

  return (
    <dialog id="create_hotel_modal" className="modal">
      <div className="modal-box bg-gradient-to-b from-blue-800 via-blue-600 to-green-500 text-white max-w-md w-full rounded-xl shadow-xl p-8">
        <h3 className="text-2xl font-bold text-center mb-6">Create New Hotel</h3>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Hotel Name"
            className="input input-bordered bg-white text-gray-800"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="location"
            placeholder="Location"
            className="input input-bordered bg-white text-gray-800"
            value={formData.location}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="address"
            placeholder="Address"
            className="input input-bordered bg-white text-gray-800"
            value={formData.address}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="contactPhone"
            placeholder="Contact Phone"
            className="input input-bordered bg-white text-gray-800"
            value={formData.contactPhone}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="category"
            placeholder="Category"
            className="input input-bordered bg-white text-gray-800"
            value={formData.category}
            onChange={handleChange}
          />

          <input
            type="url"
            name="imgUrl"
            placeholder="Image URL"
            className="input input-bordered bg-white text-gray-800"
            value={formData.imgUrl}
            onChange={handleChange}
            required
          />

          {formData.imgUrl && (
            <img
              src={formData.imgUrl}
              alt="Preview"
              className="h-40 w-full object-cover rounded border border-white"
            />
          )}

          <input
            type="number"
            name="rating"
            placeholder="Rating (0–5)"
            step="0.1"
            min="0"
            max="5"
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
            required
          />

          <div className="modal-action mt-6 flex justify-end gap-4">
            <button
              type="button"
              onClick={() =>
                (document.getElementById("create_hotel_modal") as HTMLDialogElement)?.close()
              }
              className="btn bg-green-800 text-black-800 hover:bg-blue-800"
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

export default CreateHotel;
