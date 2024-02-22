import userHandler from "../handlers/user.handler";
import { Request, Response } from "express";
import { UserRole } from "../constants";
var jwt = require("jsonwebtoken");

const secretKey: string = `${process.env.SECRET_KEY}`;

const loginUser = async (req: Request, res: Response) => {
  try {
    let user = await userHandler.getUser(req.body.email);
    if (!user) {
      return res.status(404).json({ message: "User's email not found" });
    }
    if (user.password !== req.body.password) {
      return res.status(400).json({ message: "Wrong password" });
    }
    if (user.role !== UserRole.ADMIN) {
      return res.status(401).json({ message: "Unauthorized request" });
    }
    const expiresInHours = 10;
    const expiresInSeconds = expiresInHours * 60 * 60;
    const expirationTime = Math.floor(Date.now() / 1000) + expiresInSeconds;
    const payload = {
      id: user._id,
      email: user.email,
      role: user.role,
      exp: expirationTime,
    };
    const token = jwt.sign(payload, secretKey);
    res
      .status(200)
      .json({ message: "User logged in successfully", token: token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Could not fetch the documents" });
  }
};

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
