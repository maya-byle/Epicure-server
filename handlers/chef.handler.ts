import chefModel, { IChef } from "../models/chef.model";
import restaurantModel from "../models/restaurant.model";
import DeleteStatus from "../constants";

const getAllChefs = async () => {
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
const getAllChefsOption2 = async () => {
  try {
    const chefs = await chefModel.find({ status: DeleteStatus.ACTIVE }).lean();
    const newChefs = await Promise.all(
      chefs.map(async (chef) => {
        const restaurantData = await Promise.all(
          chef.restaurants.map(async (restaurantId) => {
            return await restaurantModel.findOne({ _id: restaurantId }).lean();
          })
        );

        return { ...chef, restaurants: restaurantData };
      })
    );
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
