// src/dashboard/AdminDashboard/users/Users.tsx

import { useState } from "react";
import { usersAPI, type TUser } from "../../../Features/users/usersAPI";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import CreateUser from "./CreateUser";
import UpdateUser from "./UpdateUser";
import DeleteUser from "./DeleteUser";

const Users = () => {
  const { data: users, isLoading } = usersAPI.useGetAllUsersQuery();
  const [selectedUser, setSelectedUser] = useState<TUser | null>(null);
  const [userToDelete, setUserToDelete] = useState<TUser | null>(null);

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 h-[calc(100vh-100px)] overflow-auto">
      {/* Create Button */}
      <div className="flex justify-end">
        <button
          className="btn bg-blue-600 text-white hover:bg-blue-700 px-5 py-2 rounded shadow-md"
          onClick={() =>
            (document.getElementById("create_user_modal") as HTMLDialogElement)?.showModal()
          }
        >
          + Create User
        </button>
      </div>

      {/* Modals */}
      <CreateUser />
      <UpdateUser user={selectedUser} />
      <DeleteUser user={userToDelete} />

      {/* Status Feedback */}
      {isLoading ? (
        <p className="text-center text-blue-600 font-medium">Loading users...</p>
      ) : users?.length ? (
        <div className="overflow-x-auto border-4 border-blue-500 rounded-xl shadow-md">
          <table className="table table-zebra w-full text-sm">
            <thead className="bg-blue-600 text-white text-md">
              <tr>
                <th className="p-4">Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Phone</th>
                <th className="p-4">Role</th>
                <th className="p-4">Verified</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-blue-50 transition-all duration-200"
                >
                  <td className="p-4">
                    {user.firstName} {user.lastName}
                  </td>
                  <td className="p-4">{user.email}</td>
                  <td className="p-4">{user.contactPhone}</td>
                  <td className="p-4">{user.role}</td>
                  <td className="p-4">{user.isVerified ? "Yes" : "No"}</td>
                  <td className="p-4">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => {
                          setSelectedUser(user);
                          (
                            document.getElementById("update_user_modal") as HTMLDialogElement
                          )?.showModal();
                        }}
                        className="btn btn-sm bg-blue-500 hover:bg-blue-600 text-white"
                      >
                        <FaEdit size={16} />
                      </button>
                      <button
                        onClick={() => {
                          setUserToDelete(user);
                          (
                            document.getElementById("delete_user_modal") as HTMLDialogElement
                          )?.showModal();
                        }}
                        className="btn btn-sm bg-red-500 hover:bg-red-600 text-white"
                      >
                        <MdDelete size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-500 font-medium">No users found.</p>
      )}
    </div>
  );
};

export default Users;
