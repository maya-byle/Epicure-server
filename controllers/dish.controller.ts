import dishHandler from "../handlers/dish.handler";
import { Request, Response } from "express";
import restaurantHandler from "../handlers/restaurant.handler";
import DeleteStatus from "../constants";

const getAllDishes = async (req: Request, res: Response) => {
  try {
    let dishes;
    if (req.baseUrl.includes("api")) {
      dishes = await dishHandler.getAllDishes(true);
    } else {
      dishes = await dishHandler.getAllDishes(false);
    }
    res
      .status(200)
      .json({ message: "Dishes fetched successfully", data: dishes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "could not fetch the documents" });
  }
};

const createDish = async (req: Request, res: Response) => {
  try {
    const newDish = await dishHandler.createDish(req.body);
    res
      .status(200)
      .json({ message: "Dish created successfully", data: newDish });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Could not create the dish" });
  }
};

const updateDish = async (req: Request, res: Response) => {
  try {
    const dishId = req.params.id;
    if (req.body.tags) {
      req.body.tags = req.body.tags.split(",");
    }
    if (req.body.restaurant) {
      req.body.restaurant = await restaurantHandler.getRestaurantId(
        req.body.restaurant
      );
    }
    const updatedDish = await dishHandler.updateDish(dishId, req.body);
    res
      .status(200)
      .json({ message: "Dish updated successfully", data: updatedDish });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Could not update the dish" });
  }
};

const deleteDish = async (req: Request, res: Response) => {
  try {
    const dishId = req.params.id;
    const dish = await dishHandler.getDishById(dishId);
    let deletedDish;
    if (dish?.status === DeleteStatus.DELETED) {
      deletedDish = await dishHandler.deletePermenatlyDish(dishId);
    } else {
      deletedDish = await dishHandler.deleteDish(dishId);
    }
    if (!deletedDish) return res.status(404).json({ error: "Dish not found" });
    res
      .status(200)
      .json({ message: "Dish deleted successfully", data: deletedDish });
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
