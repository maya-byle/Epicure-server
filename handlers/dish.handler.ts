import dishModel, { IDish } from "../models/dish.model";

const getAllDishes = () => {
  return dishModel.find({ isDeleted: false });
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
    { isDeleted: true },
    { new: true }
  );
};

export default { getAllDishes, createDish, updateDish, deleteDish };
