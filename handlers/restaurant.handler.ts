import restaurantModel, { IRestaurant } from "../models/restaurant.model";

const getAllRestaurants = () => {
  return restaurantModel.find({ isDeleted: false });
};

const createRestaurant = (restaurant: IRestaurant) => {
  return restaurantModel.create(restaurant);
};

const updateRestaurant = (
  restaurantId: string,
  updates: Partial<IRestaurant>
) => {
  return restaurantModel.updateOne({ _id: restaurantId }, updates);
};

const deleteRestaurant = (restaurantId: string) => {
  return restaurantModel.findByIdAndUpdate(
    restaurantId,
    { isDeleted: true },
    { new: true }
  );
};

export default {
  getAllRestaurants,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
};
