import chefModel, { IChef } from "../models/chef.model";
import restaurantModel from "../models/restaurant.model";
import DeleteStatus from "../constants";

const getAllChefs = async () => {
  try {
    return chefModel.find({ status: DeleteStatus.ACTIVE });
    // .populate({
    //   path: "restaurants",
    //   match: { status: DeleteStatus.ACTIVE },
    // });
    // return getAllChefsOption2();
  } catch (err) {
    console.log(err);
  }
};

// Populate restaurants objects
// Option 2: without using populate
const getAllChefsOption2 = async () => {
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
