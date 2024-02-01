import DeleteStatus from "../constants";
import dishModel, { IDish } from "../models/dish.model";
import restaurantModel, { IRestaurant } from "../models/restaurant.model";
import chefModel, { IChef } from "../models/chef.model";

const get = async (searchInput: string) => {
  const restaurants: IRestaurant[] = await restaurantModel
    .find({
      title: { $regex: searchInput, $options: "i" },
      status: DeleteStatus.ACTIVE,
    })
    .lean();

  const chefs: IChef[] = await chefModel
    .find({
      name: { $regex: searchInput, $options: "i" },
      status: DeleteStatus.ACTIVE,
    })
    .lean();

  const dishes: IDish[] = await dishModel
    .find({
      name: { $regex: searchInput, $options: "i" },
      status: DeleteStatus.ACTIVE,
    })
    .lean();

  return {
    restaurants: restaurants,
    chefs: chefs,
    dishes: dishes,
  };
};

export default { get };
