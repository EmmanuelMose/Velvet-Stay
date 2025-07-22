// src/dashboard/AdminDashboard/rooms/DeleteRoom.tsx
import { toast } from "sonner";
import { roomsApi, type TRoom } from "../../../Features/rooms/roomAPI";

type Props = {
  room: TRoom | null;
};

const DeleteRoom = ({ room }: Props) => {
  const [deleteRoom, { isLoading }] = roomsApi.useDeleteRoomMutation({
    fixedCacheKey: "deleteRoom",
  });

  const handleDelete = async () => {
    if (!room) {
      toast.error("No room selected for deletion.");
      return;
    }

    try {
      await deleteRoom(room.roomId).unwrap();
      toast.success("Room deleted successfully!");
      (document.getElementById("delete_room_modal") as HTMLDialogElement)?.close();
    } catch (error) {
      console.error("Delete failed:", error);
      toast.error("Failed to delete room.");
    }
  };

  return (
    <dialog id="delete_room_modal" className="modal">
      <div className="modal-box bg-gradient-to-b from-blue-800 via-blue-600 to-green-500 text-white max-w-md w-full rounded-2xl shadow-2xl p-8">
        <h3 className="text-2xl font-bold text-center mb-6">Delete Room</h3>
        <p className="text-center text-lg mb-8">
          Are you sure you want to delete Room Type:
          <br />
          <span className="font-bold underline">{room?.roomType}</span>?
        </p>
        <div className="modal-action mt-6 flex justify-end gap-4">
          <button
            className="btn px-5 py-2 bg-green-700 text-white hover:bg-blue-700 rounded-md shadow-md transition duration-200"
            onClick={handleDelete}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="loading loading-spinner"></span> Deleting...
              </>
            ) : (
              "Delete"
            )}
          </button>

          <button
            className="btn px-5 py-2 bg-green-700 text-black hover:bg-blue-700 rounded-md shadow-sm transition duration-200"
            onClick={() =>
              (document.getElementById("delete_room_modal") as HTMLDialogElement)?.close()
            }
          >
            Cancel
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default DeleteRoom;
