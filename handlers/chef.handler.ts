import chefModel, { IChef } from "../models/chef.model";

const getAllChefs = () => {
  return chefModel.find({ isDeleted: false });
};

const createChef = (chef: IChef) => {
  return chefModel.create(chef);
};

const updateChef = (chefId: string, updates: Partial<IChef>) => {
  return chefModel.updateOne({ _id: chefId }, updates);
};

const deleteChef = (chefId: string) => {
  return chefModel.findByIdAndUpdate(
    chefId,
    { isDeleted: true },
    { new: true }
  );
};

export default { getAllChefs, createChef, updateChef, deleteChef };
