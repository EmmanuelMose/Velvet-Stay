import { createUserService, getAllUsersService, getUserByIdService, updateUserService, deleteUserService, } from "../users/users.service.js";
// Create User Controller
export const createUserController = async (req, res) => {
    try {
        const user = req.body;
        console.log(user);
        const newUser = await createUserService(user);
        if (!newUser) {
            return res.status(400).json({ message: "User not created" });
        }
        return res.status(201).json({ message: "User created successfully", user: newUser });
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
// Get All Users Controller
export const getAllUsersController = async (req, res) => {
    try {
        const users = await getAllUsersService();
        if (!users || users.length === 0) {
            return res.status(404).json({ message: "No users found" });
        }
        return res.status(200).json(users);
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
// Get User by ID Controller
export const getUserByIdController = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: "Invalid User ID" });
        }
        const user = await getUserByIdService(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ data: user });
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
// Update User Controller
export const updateUserController = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: "Invalid User ID" });
        }
        const existingUser = await getUserByIdService(id);
        if (!existingUser) {
            return res.status(404).json({ message: "User not found" });
        }
        const updated = await updateUserService(id, req.body);
        return res.status(200).json({ message: updated });
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
// Delete User Controller
export const deleteUserController = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: "Invalid User ID" });
        }
        const existingUser = await getUserByIdService(id);
        if (!existingUser) {
            return res.status(404).json({ message: "User not found" });
        }
        const deleted = await deleteUserService(id);
        return res.status(202).json({ message: deleted });
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
