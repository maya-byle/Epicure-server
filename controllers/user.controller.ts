import userHandler from "../handlers/user.handler";
import { Request, Response } from "express";
import { UserRole } from "../constans.ts";

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

const loginUser = async (req: Request, res: Response) => {
  try {
    let user = await userHandler.getUser(req.body.email);
    if (!user) {
      return res.status(404).json({ error: "User's email not found" });
    }
    if (user.password !== req.body.password) {
      return res.status(400).json({ error: "Wrong password" });
    }
    if (user.role !== UserRole.ADMIN) {
      return res.status(401).json({ error: "Unauthorized request" });
    }
    // TODO: return JWT
    res
      .status(200)
      .json({ message: "User logged in successfully", data: user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Could not fetch the documents" });
  }
};

const createUser = async (req: Request, res: Response) => {
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
  loginUser,
};
