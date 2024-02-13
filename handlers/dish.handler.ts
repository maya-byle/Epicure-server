import DeleteStatus from "../constants";
import dishModel, { IDish } from "../models/dish.model";

const getAllDishes = (activeOnly: boolean) => {
  try {
    const query = activeOnly ? { status: DeleteStatus.ACTIVE } : {};
    return dishModel.find(query).populate({
      path: "restaurant",
      select: "name",
    });
  } catch (err) {
    console.log(err);
  }
};

const createDish = (dish: IDish) => {
  return dishModel.create(dish);
};

const updateDish = (dishId: string, updates: Partial<IDish>) => {
  return dishModel.findOneAndUpdate({ _id: dishId }, updates, { new: true });
};

const deleteDish = (dishId: string) => {
  return dishModel.findByIdAndUpdate(
    dishId,
    { status: DeleteStatus.DELETED },
    { new: true }
  );
};

export default { getAllDishes, createDish, updateDish, deleteDish };
