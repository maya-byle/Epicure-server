import DeleteStatus from "../constants";
import dishModel, { IDish } from "../models/dish.model";

const getAllDishes = (activeOnly: boolean) => {
  try {
    if (activeOnly) {
      return dishModel.find({ status: DeleteStatus.ACTIVE });
    } else {
      return dishModel.find();
    }
  } catch (err) {
    console.log(err);
  }
};

const createDish = (dish: IDish) => {
  return dishModel.create(dish);
};

const updateDish = (dishId: string, updates: Partial<IDish>) => {
  return dishModel.updateOne({ _id: dishId }, updates);
};

const deleteDish = (dishId: string) => {
  return dishModel.findByIdAndUpdate(
    dishId,
    { status: DeleteStatus.DELETED },
    { new: true }
  );
};

export default { getAllDishes, createDish, updateDish, deleteDish };
