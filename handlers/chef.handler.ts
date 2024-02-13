import chefModel, { IChef } from "../models/chef.model";
import DeleteStatus from "../constants";

const getAllChefs = async (activeOnly: boolean) => {
  try {
    const query = activeOnly ? { status: DeleteStatus.ACTIVE } : {};
    return chefModel.find(query).populate({
      path: "restaurants",
      select: "name",
    });
  } catch (err) {
    console.error(err);
  }
};

const getAllChefsPopulate = async () => {
  try {
    return chefModel.find({ status: DeleteStatus.ACTIVE }).populate({
      path: "restaurants",
      match: { status: DeleteStatus.ACTIVE },
    });
    // return getAllChefsOption2();
  } catch (err) {
    console.log(err);
  }
};

// Populate restaurants objects
// Option 2: without using populate
const getAllChefsPopulate2 = async () => {
  try {
    const newChefs = await chefModel.aggregate([
      { $match: { status: DeleteStatus.ACTIVE } },
      {
        $lookup: {
          from: "restaurants",
          localField: "restaurants",
          foreignField: "_id",
          as: "restaurantsData",
        },
      },
      { $addFields: { restaurants: "$restaurantsData" } },
    ]);

    return newChefs;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const createChef = (chef: IChef) => {
  return chefModel.create(chef);
};

const updateChef = (chefId: string, updates: Partial<IChef>) => {
  return chefModel.findOneAndUpdate({ _id: chefId }, updates, { new: true });
};

const deleteChef = (chefId: string) => {
  return chefModel.findByIdAndUpdate(
    chefId,
    { status: DeleteStatus.DELETED },
    { new: true }
  );
};

export default { getAllChefs, createChef, updateChef, deleteChef };
