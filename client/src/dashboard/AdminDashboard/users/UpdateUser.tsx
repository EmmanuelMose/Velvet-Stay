// src/dashboard/AdminDashboard/users/UpdateUser.tsx
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { usersAPI, type TUser } from "../../../Features/users/usersAPI";

type Props = {
  user: TUser | null;
};

const UpdateUser = ({ user }: Props) => {
  const [updateUser, { isLoading }] = usersAPI.useUpdateUserMutation();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contactPhone: "",
    address: "",
    role: "User",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        contactPhone: user.contactPhone,
        address: user.address,
        role: user.role,
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    if (!user) return;

    try {
      await updateUser({ id: user.id, data: formData }).unwrap();
      toast.success("User updated successfully!");
      (document.getElementById("update_user_modal") as HTMLDialogElement)?.close();
    } catch (err) {
      console.error("Update user failed", err);
      toast.error("Failed to update user.");
    }
  };

  return (
    <dialog id="update_user_modal" className="modal">
      <div className="modal-box bg-gradient-to-b from-blue-800 via-blue-600 to-green-500 text-white max-w-md w-full rounded-2xl shadow-2xl p-8">
        <h3 className="text-2xl font-bold text-center mb-6">Update User</h3>

        <form className="flex flex-col space-y-4">
          <input
            name="firstName"
            className="input input-bordered bg-white text-gray-800"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="First Name"
          />
          <input
            name="lastName"
            className="input input-bordered bg-white text-gray-800"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Last Name"
          />
          <input
            name="email"
            className="input input-bordered bg-white text-gray-800"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
          />
          <input
            name="contactPhone"
            className="input input-bordered bg-white text-gray-800"
            value={formData.contactPhone}
            onChange={handleChange}
            placeholder="Contact Phone"
          />
          <input
            name="address"
            className="input input-bordered bg-white text-gray-800"
            value={formData.address}
            onChange={handleChange}
            placeholder="Address"
          />
          <select
            name="role"
            className="select select-bordered bg-white text-gray-800"
            value={formData.role}
            onChange={handleChange}
          >
            <option>User</option>
            <option>Admin</option>
          </select>

          <div className="modal-action justify-end gap-4 mt-6">
            <button
              type="button"
              className="btn px-5 py-2 bg-green-700 text-black hover:bg-blue-700 rounded-md shadow-sm transition duration-200"
              onClick={() =>
                (document.getElementById("update_user_modal") as HTMLDialogElement)?.close()
              }
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn px-5 py-2 bg-green-700 text-white hover:bg-blue-700 rounded-md shadow-md transition duration-200"
              onClick={handleUpdate}
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default UpdateUser;
