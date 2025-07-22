// src/dashboard/AdminDashboard/hotels/DeleteHotel.tsx

import { toast } from "sonner";
import { hotelApi, type THotel } from "../../../Features/hotels/hotelAPI";

type DeleteHotelProps = {
  hotel: THotel | null;
};

const DeleteHotel = ({ hotel }: DeleteHotelProps) => {
  const [deleteHotel, { isLoading }] = hotelApi.useDeleteHotelMutation({
    fixedCacheKey: "deleteHotel",
  });

  const handleDelete = async () => {
    try {
      if (!hotel) {
        toast.error("No hotel selected for deletion.");
        return;
      }

      await deleteHotel(hotel.hotelId).unwrap();
      toast.success("Hotel deleted successfully!");
      (document.getElementById("delete_hotel_modal") as HTMLDialogElement)?.close();
    } catch (error) {
      console.error("Error deleting hotel:", error);
      toast.error("Failed to delete hotel. Please try again.");
    }
  };

  return (
    <dialog id="delete_hotel_modal" className="modal">
      <div className="modal-box bg-gradient-to-b from-blue-800 via-blue-600 to-green-500 text-white max-w-md w-full rounded-xl shadow-xl p-8">
        <h3 className="text-2xl font-bold text-center mb-6">Delete Hotel</h3>

        <p className="text-center text-lg mb-8">
          Are you sure you want to delete <br />
          <span className="font-bold underline">{hotel?.name}</span>?
        </p>

        <div className="modal-action mt-6 flex justify-end gap-4">
          <button
            className="btn bg-green-800 text-white hover:bg-blue-800"
            onClick={handleDelete}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="loading loading-spinner" /> Deleting...
              </>
            ) : (
              "Delete"
            )}
          </button>

          <button
            className="btn bg-green-800 text-white-800 hover:bg-blue-800"
            onClick={() =>
              (document.getElementById("delete_hotel_modal") as HTMLDialogElement)?.close()
            }
          >
            Cancel
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default DeleteHotel;
