import DeleteStatus from "../constants";
import dishModel from "../models/dish.model";
import restaurantModel from "../models/restaurant.model";
import chefModel from "../models/chef.model";

const searchAll = async (searchInput: string) => {
  try {
    const [restaurants, chefs, dishes] = await Promise.all([
      restaurantModel
        .find({
          title: { $regex: searchInput, $options: "i" },
          status: DeleteStatus.ACTIVE,
        })
        .lean(),
      chefModel
        .find({
          name: { $regex: searchInput, $options: "i" },
          status: DeleteStatus.ACTIVE,
        })
        .lean(),
      dishModel
        .find({
          name: { $regex: searchInput, $options: "i" },
          status: DeleteStatus.ACTIVE,
        })
        .lean(),
    ]);

    return {
      restaurants,
      chefs,
      dishes,
    };
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export default { searchAll };
