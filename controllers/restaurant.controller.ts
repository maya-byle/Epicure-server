import chefHandler from "../handlers/chef.handler";
import restaurantHandler from "../handlers/restaurant.handler";
import { Request, Response } from "express";

const getAllRestaurants = async (req: Request, res: Response) => {
  try {
    let restaurants;
    if (req.baseUrl.includes("api")) {
      restaurants = await restaurantHandler.getAllRestaurants(true);
    } else {
      restaurants = await restaurantHandler.getAllRestaurants(false);
    }
    res
      .status(200)
      .json({ message: "Restaurants fetched successfully", data: restaurants });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "could not fetch the documents" });
  }
};

const createRestaurant = async (req: Request, res: Response) => {
  try {
    const newRestaurant = await restaurantHandler.createRestaurant(req.body);
    res.status(200).json({
      message: "Restaurant created successfully",
      data: newRestaurant,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Could not create the restaurant" });
  }
};

const updateRestaurant = async (req: Request, res: Response) => {
  try {
    const restaurantId = req.params.id;
    if (req.body.chef) {
      req.body.chef = await chefHandler.getChefId(req.body.chef);
    }
    const updatedRestaurant = await restaurantHandler.updateRestaurant(
      restaurantId,
      req.body
    );
    console.log(updateRestaurant);
    res.status(200).json({
      message: "Restaurant updated successfully",
      data: updatedRestaurant,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Could not update the restaurant" });
  }
};

const deleteRestaurant = async (req: Request, res: Response) => {
  try {
    const restaurantId = req.params.id;
    const deletedRestaurant = await restaurantHandler.deleteRestaurant(
      restaurantId
    );
    if (!deletedRestaurant)
      return res.status(404).json({ error: "Restaurants not found" });
    res.status(200).json({
      message: "Restaurants deleted successfully",
      data: deletedRestaurant,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Could not delete the restaurant" });
  }
};

export default {
  getAllRestaurants,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
};
