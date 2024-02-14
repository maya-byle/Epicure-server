import { ObjectId } from "mongodb";
import DeleteStatus, { UserRole } from "../constants";
import UserModel, { IUser } from "../models/user.model";

const getUser = (userEmail: ObjectId) => {
  return UserModel.findOne({ email: userEmail });
};

const getAllUsers = async () => {
  try {
    return UserModel.find();
  } catch (err) {
    console.log(err);
  }
};

const createUser = (user: IUser) => {
  return UserModel.create(user);
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
  getUser,
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
};
