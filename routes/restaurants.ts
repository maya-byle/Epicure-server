import express from "express";
import restaurantModel from "../models/restaurant.model";

const router = express.Router();

router.get("/restaurants", async (req, res) => {
  try {
    const restaurants: any = await restaurantModel.find();
    res.status(200).json(restaurants);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "could not fetch the documents" });
  }
});

router.post("/restaurants", async (req, res) => {
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
});

router.put("/restaurants/:id", async (req, res) => {
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
});

router.delete("/restaurants/:id", async (req, res) => {
  try {
    const restaurantId = req.params.id;
    const deletedRestaurant = await restaurantModel.findByIdAndDelete(
      restaurantId
    );
    if (!deletedRestaurant)
      return res.status(404).json({ error: "Restaurants not found" });
    res.status(200).json({
      message: "Restaurants deleted successfully",
      restaurant: deletedRestaurant,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Could not delete the restaurants" });
  }
});

export default router;
