import dishModel from "../models/dish.model";
import { Request, Response } from "express";

const getAllDishes = async (req: Request, res: Response) => {
  try {
    const dishes: any = await dishModel.find({ isDeleted: false });
    res.status(200).json(dishes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "could not fetch the documents" });
  }
};

const createDish = async (req: Request, res: Response) => {
  try {
    const newDish = await dishModel.create(req.body);
    res
      .status(200)
      .json({ message: "Dish created successfully", dish: newDish });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Could not create the dish" });
  }
};

const updateDish = async (req: Request, res: Response) => {
  try {
    const dishId = req.params.id;
    const updatedDish = await dishModel.updateOne({ _id: dishId }, req.body);
    res
      .status(200)
      .json({ message: "Dish updated successfully", dish: updatedDish });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Could not update the dish" });
  }
};

const deleteDish = async (req: Request, res: Response) => {
  try {
    const dishId = req.params.id;
    const deletedDish = await dishModel.findByIdAndUpdate(
      dishId,
      { isDeleted: true },
      { new: true } //ensures that the updated document is returned
    );
    if (!deletedDish) return res.status(404).json({ error: "Dish not found" });
    res
      .status(200)
      .json({ message: "Dish deleted successfully", dish: deletedDish });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Could not delete the dish" });
  }
};

export default {
  getAllDishes,
  createDish,
  updateDish,
  deleteDish,
};
