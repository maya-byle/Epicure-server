import chefModel, { IChef } from "../models/chef.model";
import DeleteStatus from "../constants";
import { ObjectId } from "mongodb";

const getChefId = async (chefName: string) => {
  try {
    const query = { name: chefName };
    return chefModel.findOne(query).select("_id");
  } catch (err) {
    console.log(err);
  }
};

const getChefById = async (chefId: string) => {
  return chefModel.findOne({ _id: chefId });
};

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

const getChefOfTheWeek = async (isPopulated: boolean) => {
  try {
    if (!isPopulated) return chefModel.findOne({ isChefOfTheWeek: true });
    return chefModel.findOne({ isChefOfTheWeek: true }).populate({
      path: "restaurants",
      select: ["name", "image"],
    });
  } catch (err) {
    console.error(err);
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

const updateChef = async (chefId: string | ObjectId, updates: any) => {
  return await chefModel.findOneAndUpdate({ _id: chefId }, updates, {
    new: true,
  });
};

const deleteChef = (chefId: string) => {
  return chefModel.findByIdAndUpdate(
    chefId,
    { status: DeleteStatus.DELETED },
    { new: true }
  );
};

const removeRestaurantFromChef = async (
  chefId: IChef | undefined,
  restaurantId: string
) => {
  try {
    await chefModel.findByIdAndUpdate(chefId, {
      $pull: { restaurants: restaurantId },
    });
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const addRestaurantToChef = async (
  chefId: any,
  restaurantId: string | ObjectId
) => {
  try {
    await chefModel.findByIdAndUpdate(chefId, {
      $push: { restaurants: restaurantId },
    });
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export default {
  getChefId,
  getChefById,
  getAllChefs,
  getChefOfTheWeek,
  createChef,
  updateChef,
  deleteChef,
  removeRestaurantFromChef,
  addRestaurantToChef,
};
