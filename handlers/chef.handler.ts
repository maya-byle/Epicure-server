import chefModel, { IChef } from "../models/chef.model";
import DeleteStatus from "../constants";

const getAllChefs = () => {
  return chefModel.find({ status: DeleteStatus.ACTIVE });
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
    { status: DeleteStatus.DELETED },
    { new: true }
  );
};

export default { getAllChefs, createChef, updateChef, deleteChef };
