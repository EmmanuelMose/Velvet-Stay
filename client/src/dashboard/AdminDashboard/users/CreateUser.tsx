// src/dashboard/AdminDashboard/users/CreateUser.tsx
import { useState, type FormEvent } from "react";
import { usersAPI } from "../../../Features/users/usersAPI";
import { toast } from "sonner";

const CreateUser = () => {
  const [createUser, { isLoading }] = usersAPI.useCreateUsersMutation();

  const [formData, setFormData] = useState<{
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    contactPhone: string;
    address: string;
    role: "User" | "Admin";
  }>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    contactPhone: "",
    address: "",
    role: "User", // default
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "role" ? (value as "User" | "Admin") : value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await createUser(formData).unwrap();
      toast.success("User created successfully!");
      (document.getElementById("create_user_modal") as HTMLDialogElement)?.close();
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        contactPhone: "",
        address: "",
        role: "User",
      });
    } catch (error) {
      console.error("Create user failed:", error);
      toast.error("Failed to create user.");
    }
  };

  return (
    <dialog id="create_user_modal" className="modal">
      <div className="modal-box bg-gradient-to-b from-blue-800 via-blue-600 to-green-500 text-white max-w-md w-full rounded-xl shadow-xl p-8">
        <h3 className="text-2xl font-bold text-center mb-6">Create New User</h3>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input
            name="firstName"
            placeholder="First Name"
            className="input input-bordered bg-white text-gray-800"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <input
            name="lastName"
            placeholder="Last Name"
            className="input input-bordered bg-white text-gray-800"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            className="input input-bordered bg-white text-gray-800"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            className="input input-bordered bg-white text-gray-800"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input
            name="contactPhone"
            placeholder="Contact Phone"
            className="input input-bordered bg-white text-gray-800"
            value={formData.contactPhone}
            onChange={handleChange}
          />
          <input
            name="address"
            placeholder="Address"
            className="input input-bordered bg-white text-gray-800"
            value={formData.address}
            onChange={handleChange}
          />
          <select
            name="role"
            className="select select-bordered bg-white text-gray-800"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="User">User</option>
            <option value="Admin">Admin</option>
          </select>
          <div className="modal-action justify-end gap-4 mt-6">
            <button
              type="button"
              className="btn bg-green-800 text-white hover:bg-blue-800"
              onClick={() =>
                (document.getElementById("create_user_modal") as HTMLDialogElement)?.close()
              }
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn bg-green-800 text-white hover:bg-blue-800"
              disabled={isLoading}
            >
              {isLoading ? "Creating..." : "Create"}
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default CreateUser;
