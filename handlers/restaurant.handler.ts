import DeleteStatus from "../constants";
import restaurantModel, { IRestaurant } from "../models/restaurant.model";

const getRestaurantId = async (restaurantName: string) => {
  try {
    const query = { name: restaurantName };
    return restaurantModel.findOne(query).select("_id");
  } catch (err) {
    console.log(err);
  }
};

const getAllRestaurants = async (activeOnly: boolean) => {
  try {
    const query = activeOnly ? { status: DeleteStatus.ACTIVE } : {};
    return restaurantModel.find(query).populate({
      path: "chef",
      select: "name",
    });
  } catch (err) {
    console.log(err);
  }
};

const getRestaurantById = (restaurantId: string) => {
  return restaurantModel.findOne({ _id: restaurantId });
};

const createRestaurant = (restaurant: IRestaurant) => {
  return restaurantModel.create(restaurant);
};

const updateRestaurant = (
  restaurantId: string,
  updates: Partial<IRestaurant>
) => {
  return restaurantModel.findOneAndUpdate({ _id: restaurantId }, updates, {
    new: true,
  });
};

const deletePermenatlyRestaurant = (restaurantId: string) => {
  return restaurantModel.findByIdAndDelete(restaurantId, {
    status: DeleteStatus.DELETED,
  });
};

const deleteRestaurant = (restaurantId: string) => {
  return restaurantModel.findByIdAndUpdate(
    restaurantId,
    { status: DeleteStatus.DELETED },
    { new: true }
  );
};

export default {
  getRestaurantId,
  getRestaurantById,
  getAllRestaurants,
  createRestaurant,
  updateRestaurant,
  deletePermenatlyRestaurant,
  deleteRestaurant,
};
