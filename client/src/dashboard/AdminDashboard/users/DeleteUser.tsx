// src/dashboard/AdminDashboard/users/DeleteUser.tsx
import { toast } from "sonner";
import { usersAPI, type TUser } from "../../../Features/users/usersAPI";

type Props = {
  user: TUser | null;
};

const DeleteUser = ({ user }: Props) => {
  const [deleteUser, { isLoading }] = usersAPI.useDeleteUserMutation();

  const handleDelete = async () => {
    if (!user) return;
    try {
      await deleteUser(user.userId).unwrap();
      toast.success("User deleted successfully!");
      (document.getElementById("delete_user_modal") as HTMLDialogElement)?.close();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete user.");
    }
  };

  return (
    <dialog id="delete_user_modal" className="modal">
      <div className="modal-box bg-gradient-to-b from-blue-800 via-blue-600 to-green-500 text-white max-w-md w-full rounded-2xl shadow-2xl p-8">
        <h3 className="text-2xl font-bold text-center mb-6">Delete User</h3>

        <p className="text-center text-lg">
          Are you sure you want to delete <br />
          <span className="font-bold underline">
            {user?.firstName} {user?.lastName}
          </span>?
        </p>

        <div className="modal-action justify-end gap-4 mt-8">
          <button
            className="btn px-6 py-2 bg-green-700 text-white hover:bg-blue-700 rounded-md shadow-md transition duration-200"
            onClick={handleDelete}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="loading loading-spinner text-white"></span>
            ) : (
              "Delete"
            )}
          </button>

          <button
            className="btn px-6 py-2 bg-green-700 text-black hover:bg-blue-700 border border-white rounded-md shadow-sm transition duration-200"
            onClick={() =>
              (document.getElementById("delete_user_modal") as HTMLDialogElement)?.close()
            }
          >
            Cancel
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default DeleteUser;
