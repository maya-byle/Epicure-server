import restaurantModel from "../models/restaurant.model";
import { Request, Response } from "express";

const getAllRestaurants = async (req: Request, res: Response) => {
  try {
    const restaurants: any = await restaurantModel.find({ isDeleted: false });
    res.status(200).json(restaurants);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "could not fetch the documents" });
  }
};

const createRestaurant = async (req: Request, res: Response) => {
  try {
    const newRestaurant = await restaurantModel.create(req.body);
    res.status(200).json({
      message: "Restaurant created successfully",
      restaurant: newRestaurant,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Could not create the restaurant" });
  }
};

const updateRestaurant = async (req: Request, res: Response) => {
  try {
    const restaurantId = req.params.id;
    const updatedRestaurant = await restaurantModel.updateOne(
      { _id: restaurantId },
      req.body
    );
    res.status(200).json({
      message: "Restaurant updated successfully",
      restaurant: updatedRestaurant,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Could not update the restaurant" });
  }
};

const deleteRestaurant = async (req: Request, res: Response) => {
  try {
    const restaurantId = req.params.id;
    const deletedRestaurant = await restaurantModel.findByIdAndUpdate(
      restaurantId,
      { isDeleted: true },
      { new: true }
    );

    if (!deletedRestaurant)
      return res.status(404).json({ error: "Restaurants not found" });
    res.status(200).json({
      message: "Restaurants deleted successfully",
      restaurant: deletedRestaurant,
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
