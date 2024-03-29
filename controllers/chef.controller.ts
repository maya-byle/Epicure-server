import chefHandler from "../handlers/chef.handler";
import { Request, Response } from "express";
import DeleteStatus from "../constants";
import restaurantHandler from "../handlers/restaurant.handler";
import dishHandler from "../handlers/dish.handler";

const getAllChefs = async (req: Request, res: Response) => {
  try {
    let chefs;
    if (req.baseUrl.includes("api")) {
      chefs = await chefHandler.getAllChefs(true);
    } else {
      chefs = await chefHandler.getAllChefs(false);
    }
    res
      .status(200)
      .json({ message: "Chefs fetched successfully", data: chefs });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Could not fetch the documents" });
  }
};

const getChefOfTheWeek = async (req: Request, res: Response) => {
  try {
    const chef = await chefHandler.getChefOfTheWeek(true);
    res.status(200).json({ message: "Chefs fetched successfully", data: chef });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Could not fetch the documents" });
  }
};

const createChef = async (req: Request, res: Response) => {
  try {
    const newChef = await chefHandler.createChef(req.body);
    res
      .status(200)
      .json({ message: "Chef created successfully", data: newChef });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Could not create the chef" });
  }
};

const updateChef = async (req: Request, res: Response) => {
  try {
    const chefId = req.params.id;
    const oldChef = await chefHandler.getChefById(chefId);
    if (req.body.isChefOfTheWeek !== oldChef?.isChefOfTheWeek) {
      if (req.body.isChefOfTheWeek) {
        const oldChefOfTheWeek = await chefHandler.getChefOfTheWeek(false);
        if (oldChefOfTheWeek) {
          await chefHandler.updateChef(oldChefOfTheWeek._id, {
            isChefOfTheWeek: false,
          });
        }
      }
    }
    const { restaurants, ...updatesWithoutRestaurants } = req.body;
    const updatedChef = await chefHandler.updateChef(
      chefId,
      updatesWithoutRestaurants
    );
    res
      .status(200)
      .json({ message: "Chef updated successfully", data: updatedChef });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Could not update the chef" });
  }
};

const deleteChef = async (req: Request, res: Response) => {
  try {
    const chefId = req.params.id;
    const chef = await chefHandler.getChefById(chefId);
    let deletedChef;
    if (chef?.status === DeleteStatus.DELETED) {
      deletedChef = await chefHandler.deletePermenatlyChef(chefId);
      // Changing the chefs restaurants status to deleted
      const chefRestaurants = chef.restaurants;
      chefRestaurants.forEach(async (restaurant) => {
        const restaurantId = restaurant.toString();
        await restaurantHandler.deleteRestaurant(restaurantId);
        // Changing the restaurants dishes to deleted
        const restaurantDishes = await dishHandler.getDishesByRestaurnt(
          restaurantId
        );
        restaurantDishes.forEach(async (dish) => {
          await dishHandler.deleteDish(dish._id.toString());
        });
      });
    } else {
      deletedChef = await chefHandler.deleteChef(chefId);
    }
    if (!deletedChef) return res.status(404).json({ error: "Chef not found" });
    res
      .status(200)
      .json({ message: "Chef deleted successfully", data: deletedChef });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Could not delete the chef" });
  }
};

export default {
  getAllChefs,
  getChefOfTheWeek,
  createChef,
  updateChef,
  deleteChef,
};
