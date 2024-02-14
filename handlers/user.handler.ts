import { ObjectId } from "mongodb";
import DeleteStatus, { UserRole } from "../constants";
import UserModel, { IUser } from "../models/user.model";

const getAllUsers = async () => {
  try {
    return UserModel.find();
  } catch (err) {
    console.log(err);
  }
};

const getUserById = (UserId: ObjectId) => {
  return UserModel.findOne({ _id: UserId });
};

const createUser = (User: IUser) => {
  return UserModel.create(User);
};

const updateUser = (UserId: string, updates: Partial<IUser>) => {
  return UserModel.findOneAndUpdate({ _id: UserId }, updates, {
    new: true,
  });
};

const deleteUser = (UserId: string) => {
  return UserModel.findByIdAndUpdate(
    UserId,
    { status: DeleteStatus.DELETED },
    { new: true }
  );
};

export default {
  getUserById,
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
};
