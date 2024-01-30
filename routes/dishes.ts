import express from "express";
import dishModel from "../models/dish.model";

const router = express.Router();

router.get("/dishes", async (req, res) => {
  try {
    const dishes: any = await dishModel.find();
    res.status(200).json(dishes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "could not fetch the documents" });
  }
});

router.post("/dishes", async (req, res) => {
  try {
    const newDish = await dishModel.create(req.body);
    res
      .status(200)
      .json({ message: "Dish created successfully", dish: newDish });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Could not create the dish" });
  }
});

router.put("/dishes/:id", async (req, res) => {
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
});

router.delete("/dishes/:id", async (req, res) => {
  try {
    const dishId = req.params.id;
    const deletedDish = await dishModel.findByIdAndDelete(dishId);
    if (!deletedDish) return res.status(404).json({ error: "Dish not found" });
    res
      .status(200)
      .json({ message: "Dish deleted successfully", dish: deletedDish });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Could not delete the dish" });
  }
});

export default router;
