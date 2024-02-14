import userHandler from "../handlers/user.handler";
import { Request, Response } from "express";

const getAllUsers = async (req: Request, res: Response) => {
  try {
    let users = await userHandler.getAllUsers();
    res
      .status(200)
      .json({ message: "Users fetched successfully", data: users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Could not fetch the documents" });
  }
};

const createUser = async (req: Request, res: Response) => {
  console.log("-------------------------");
  console.log(req.body);
  try {
    const newUser = await userHandler.createUser(req.body);
    res
      .status(200)
      .json({ message: "User created successfully", data: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Could not create the User" });
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const updatedUser = await userHandler.updateUser(userId, req.body);
    res
      .status(200)
      .json({ message: "User updated successfully", data: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Could not update the user" });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const deletedUser = await userHandler.deleteUser(userId);
    if (!deletedUser) return res.status(404).json({ error: "User not found" });
    res
      .status(200)
      .json({ message: "User deleted successfully", data: deletedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Could not delete the User" });
  }
};

export default {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
};
