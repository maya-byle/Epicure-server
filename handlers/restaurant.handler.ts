import DeleteStatus from "../constants";
import restaurantModel, { IRestaurant } from "../models/restaurant.model";

const getAllRestaurants = () => {
  return restaurantModel.find({ status: DeleteStatus.ACTIVE });
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
    { status: DeleteStatus.DELETED },
    { new: true }
  );
};

export default {
  getAllRestaurants,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
};
